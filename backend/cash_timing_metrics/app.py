"""Cash-Timing v2 pseudonymous usage receiver (Flask WSGI)."""

from __future__ import annotations

import collections
import datetime
import logging
import os
import re
import threading
import time
from typing import Callable, Optional

from flask import Flask, jsonify, request
from werkzeug.exceptions import (
    BadRequest,
    HTTPException,
    MethodNotAllowed,
    RequestEntityTooLarge,
    UnsupportedMediaType,
)

from store import MetricsStore

logger = logging.getLogger(__name__)

MAX_BODY_BYTES = 512
TOKEN_RE = re.compile(r"^[0-9a-f]{64}$")
EXAMPLE_FIXED_TOKEN = "e74634539ed270ecb4ca9dc9f02da36da2e961a5615b47d72a37a10444efb890"

ALLOWED_EVENTS = frozenset({
    "calculator_visit",
    "own_calculation_completed",
    "example_calculation_completed",
})

ALLOWED_SOURCES = frozenset({
    "facebook",
    "x",
    "threads",
    "linkedin",
    "reddit",
    "moneysavingexpert",
    "pinterest",
    "youtube",
    "google",
    "bing",
    "other_referral",
    "direct_or_unknown",
})

ALLOWED_CAMPAIGNS = frozenset({
    "cash_timing_v1",
    "none",
})

EVENT_KEYS = frozenset({"schema_version", "browser_token", "event", "source", "campaign"})
FORGET_KEYS = frozenset({"schema_version", "browser_token"})


def _parse_allowed_origins(origins_str: str) -> set[str]:
    if not origins_str:
        return set()
    return {o.strip() for o in origins_str.split(",") if o.strip() and o.strip() != "*"}


class _BoundedRateLimiter:
    """Ephemeral in-memory sliding-window rate limiter without persistent fingerprinting."""

    def __init__(self, max_per_minute: int) -> None:
        self.max_per_minute = max_per_minute
        self._lock = threading.Lock()
        self._timestamps: collections.deque[float] = collections.deque()

    def allow(self) -> bool:
        if self.max_per_minute <= 0:
            return True
        now = time.monotonic()
        cutoff = now - 60.0
        with self._lock:
            while self._timestamps and self._timestamps[0] < cutoff:
                self._timestamps.popleft()
            if len(self._timestamps) >= self.max_per_minute:
                return False
            self._timestamps.append(now)
            return True


def _is_valid_token(val: object) -> bool:
    return (
        isinstance(val, str)
        and bool(TOKEN_RE.match(val))
        and val != EXAMPLE_FIXED_TOKEN
    )


def create_app(
    test_config: Optional[dict] = None,
    now_fn: Optional[Callable[[], datetime.date]] = None,
) -> Flask:
    app = Flask(__name__)
    app.config["MAX_CONTENT_LENGTH"] = MAX_BODY_BYTES

    app.config["METRICS_DB_PATH"] = os.environ.get(
        "METRICS_DB_PATH",
        os.path.join(os.path.dirname(__file__), "cash_timing_metrics.sqlite3"),
    )
    app.config["SERVER_HMAC_SECRET"] = os.environ.get("SERVER_HMAC_SECRET", "")
    app.config["ALLOWED_ORIGINS"] = os.environ.get(
        "ALLOWED_ORIGINS", "https://kf-software.com"
    )
    try:
        app.config["RATE_LIMIT_PER_MINUTE"] = int(
            os.environ.get("RATE_LIMIT_PER_MINUTE", "600")
        )
    except (TypeError, ValueError):
        app.config["RATE_LIMIT_PER_MINUTE"] = 600

    if test_config:
        app.config.update(test_config)

    allowed_origins = _parse_allowed_origins(app.config.get("ALLOWED_ORIGINS", ""))
    app.config["ALLOWED_ORIGINS_SET"] = allowed_origins

    limiter = _BoundedRateLimiter(app.config["RATE_LIMIT_PER_MINUTE"])

    store: Optional[MetricsStore] = None
    if app.config.get("SERVER_HMAC_SECRET"):
        store = MetricsStore(
            db_path=app.config["METRICS_DB_PATH"],
            hmac_secret=app.config["SERVER_HMAC_SECRET"],
            now_fn=now_fn,
        )
    app.config["METRICS_STORE"] = store

    def _check_origin() -> Optional[str]:
        origin = request.headers.get("Origin")
        if not origin or origin not in allowed_origins:
            return None
        return origin

    @app.after_request
    def apply_security_and_cors(response):
        response.headers["Cache-Control"] = "no-store"
        response.headers["X-Content-Type-Options"] = "nosniff"
        origin = request.headers.get("Origin")
        if origin and origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type"
            response.headers["Access-Control-Max-Age"] = "600"
            response.headers["Vary"] = "Origin"
        return response

    @app.errorhandler(RequestEntityTooLarge)
    def handle_too_large(_err):
        return jsonify({"error": "payload_too_large"}), 413

    @app.errorhandler(UnsupportedMediaType)
    def handle_unsupported_media(_err):
        return jsonify({"error": "unsupported_media_type"}), 415

    @app.errorhandler(BadRequest)
    def handle_bad_request(_err):
        return jsonify({"error": "bad_request"}), 400

    @app.errorhandler(MethodNotAllowed)
    def handle_method_not_allowed(_err):
        return jsonify({"error": "method_not_allowed"}), 405

    @app.errorhandler(HTTPException)
    def handle_http_exc(err):
        return jsonify({"error": "http_error"}), err.code or 500

    @app.route("/cash-timing/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"}), 200

    @app.route("/cash-timing/events", methods=["OPTIONS"])
    @app.route("/cash-timing/forget", methods=["OPTIONS"])
    def cors_preflight():
        if _check_origin() is None:
            return jsonify({"error": "forbidden_origin"}), 403
        return ("", 204)

    def _parse_strict_json():
        if _check_origin() is None:
            return None, (jsonify({"error": "forbidden_origin"}), 403)
        if not limiter.allow():
            return None, (jsonify({"error": "rate_limited"}), 429)
        if request.content_length is not None and request.content_length > MAX_BODY_BYTES:
            return None, (jsonify({"error": "payload_too_large"}), 413)
        if not request.is_json:
            return None, (jsonify({"error": "unsupported_media_type"}), 415)
        data = request.get_json(silent=False)
        if not isinstance(data, dict):
            return None, (jsonify({"error": "invalid_json_object"}), 400)
        return data, None

    @app.route("/cash-timing/events", methods=["POST"])
    def ingest_event():
        if store is None:
            return jsonify({"error": "service_unconfigured"}), 503

        data, err_resp = _parse_strict_json()
        if err_resp is not None:
            return err_resp

        if set(data.keys()) != EVENT_KEYS:
            return jsonify({"error": "invalid_schema_keys"}), 400

        sv = data.get("schema_version")
        if type(sv) is not int or sv != 2:
            return jsonify({"error": "invalid_schema_version"}), 400

        token = data.get("browser_token")
        if not _is_valid_token(token):
            return jsonify({"error": "invalid_browser_token"}), 400

        event = data.get("event")
        if not isinstance(event, str) or event not in ALLOWED_EVENTS:
            return jsonify({"error": "invalid_event"}), 400

        source = data.get("source")
        if not isinstance(source, str) or source not in ALLOWED_SOURCES:
            return jsonify({"error": "invalid_source"}), 400

        campaign = data.get("campaign")
        if not isinstance(campaign, str) or campaign not in ALLOWED_CAMPAIGNS:
            return jsonify({"error": "invalid_campaign"}), 400

        try:
            store.record_event(
                browser_token=token,
                event=event,
                source=source,
                campaign=campaign,
            )
        except Exception as exc:
            logger.error("metrics_store_error class=%s", type(exc).__name__)
            return jsonify({"error": "internal_error"}), 500

        return ("", 204)

    @app.route("/cash-timing/forget", methods=["POST"])
    def forget_browser():
        if store is None:
            return jsonify({"error": "service_unconfigured"}), 503

        data, err_resp = _parse_strict_json()
        if err_resp is not None:
            return err_resp

        if set(data.keys()) != FORGET_KEYS:
            return jsonify({"error": "invalid_schema_keys"}), 400

        sv = data.get("schema_version")
        if type(sv) is not int or sv != 2:
            return jsonify({"error": "invalid_schema_version"}), 400

        token = data.get("browser_token")
        if not _is_valid_token(token):
            return jsonify({"error": "invalid_browser_token"}), 400

        try:
            store.forget_browser(browser_token=token)
        except Exception as exc:
            logger.error("metrics_forget_error class=%s", type(exc).__name__)
            return jsonify({"error": "internal_error"}), 500

        return ("", 204)

    return app


application = create_app()
