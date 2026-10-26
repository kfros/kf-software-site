"""Kitchen Exhaust Demo WSGI Request API.

A minimal, secure Flask WSGI service for processing demo sample requests
and dispatching email notifications via authenticated SMTP.
"""

import datetime
import logging
import os
import re
import smtplib
import socket
import ssl
import uuid
from email.message import EmailMessage

from flask import Flask, jsonify, request
from werkzeug.exceptions import (
    BadRequest,
    HTTPException,
    MethodNotAllowed,
    RequestEntityTooLarge,
    UnsupportedMediaType,
)

logger = logging.getLogger(__name__)

# Maximum request body size: 16 KB (16,384 bytes)
MAX_BODY_BYTES = 16384

# Conservative email validation regex
EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def _parse_allowed_origins(origins_str: str) -> set:
    """Parse comma-separated allowed origins into a set of trimmed strings."""
    if not origins_str:
        return set()
    return {origin.strip() for origin in origins_str.split(",") if origin.strip()}


def create_app(test_config: dict = None) -> Flask:
    """Application factory for the Kitchen Exhaust WSGI service."""
    app = Flask(__name__)

    # Hard request body limit enforced by Flask/Werkzeug
    app.config["MAX_CONTENT_LENGTH"] = MAX_BODY_BYTES

    # Default configuration loaded strictly from os.environ
    app.config["SMTP_HOST"] = os.environ.get("SMTP_HOST", "")
    try:
        app.config["SMTP_PORT"] = int(os.environ.get("SMTP_PORT", 587))
    except (ValueError, TypeError):
        app.config["SMTP_PORT"] = 587
    app.config["SMTP_USERNAME"] = os.environ.get("SMTP_USERNAME", "")
    app.config["SMTP_PASSWORD"] = os.environ.get("SMTP_PASSWORD", "")
    app.config["SMTP_FROM"] = os.environ.get("SMTP_FROM", "")
    app.config["SMTP_TO"] = os.environ.get("SMTP_TO", "")
    app.config["SMTP_SECURITY"] = os.environ.get("SMTP_SECURITY", "starttls")
    app.config["ALLOWED_ORIGINS"] = os.environ.get("ALLOWED_ORIGINS", "")

    # Apply test overrides if provided
    if test_config:
        app.config.update(test_config)

    # Pre-parse allowed origins into a set for fast lookup
    allowed_origins = _parse_allowed_origins(app.config.get("ALLOWED_ORIGINS", ""))
    app.config["ALLOWED_ORIGINS_SET"] = allowed_origins

    # --------------------------------------------------------------------------
    # Central CORS Header Management
    # --------------------------------------------------------------------------
    @app.after_request
    def apply_cors_headers(response):
        """Centrally attach CORS headers to every response for approved origins.
        
        Applies to 2xx, 4xx, and 5xx responses. Emits no CORS headers if the
        Origin header is missing or not present in ALLOWED_ORIGINS.
        """
        origin = request.headers.get("Origin")
        configured_origins = app.config.get("ALLOWED_ORIGINS_SET", set())
        if origin and origin in configured_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            existing_vary = response.headers.get("Vary")
            if not existing_vary:
                response.headers["Vary"] = "Origin"
            elif "Origin" not in existing_vary:
                response.headers["Vary"] = f"{existing_vary}, Origin"
        return response

    # --------------------------------------------------------------------------
    # Error Handlers
    # --------------------------------------------------------------------------
    @app.errorhandler(413)
    @app.errorhandler(RequestEntityTooLarge)
    def handle_payload_too_large(e):
        return jsonify({"accepted": False, "error": "payload_too_large"}), 413

    @app.errorhandler(415)
    @app.errorhandler(UnsupportedMediaType)
    def handle_unsupported_media_type(e):
        return jsonify({"accepted": False, "error": "unsupported_media_type"}), 415

    @app.errorhandler(405)
    @app.errorhandler(MethodNotAllowed)
    def handle_method_not_allowed(e):
        return jsonify({"accepted": False, "error": "method_not_allowed"}), 405

    @app.errorhandler(400)
    @app.errorhandler(BadRequest)
    def handle_bad_request(e):
        return jsonify({"accepted": False, "error": "invalid_request"}), 400

    @app.errorhandler(500)
    def handle_internal_error(e):
        logger.error("Internal server error: %s", type(e).__name__)
        return jsonify({"accepted": False, "error": "internal_server_error"}), 500

    # --------------------------------------------------------------------------
    # Routes
    # --------------------------------------------------------------------------
    @app.route("/health", methods=["GET"])
    def health():
        """Public health check endpoint.
        
        Does not expose environment variables, paths, versions, or SMTP state.
        Must not mutate state or send email.
        """
        return jsonify({"status": "ok"}), 200

    @app.route("/v1/kitchen-exhaust-requests", methods=["OPTIONS", "POST"])
    def kitchen_exhaust_requests():
        """Handle sample demo request submissions and CORS preflight."""
        origin = request.headers.get("Origin")
        configured_origins = app.config.get("ALLOWED_ORIGINS_SET", set())

        # Preflight OPTIONS handler
        if request.method == "OPTIONS":
            if not origin or origin not in configured_origins:
                return jsonify({"accepted": False, "error": "forbidden"}), 403

            resp = app.make_response(("", 204))
            resp.headers["Access-Control-Allow-Origin"] = origin
            resp.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
            resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
            resp.headers["Vary"] = "Origin"
            return resp

        # POST Origin verification (browser boundary enforcement)
        if not origin or origin not in configured_origins:
            return jsonify({"accepted": False, "error": "forbidden"}), 403

        # Body length pre-check optimization (authoritative limit enforced by MAX_CONTENT_LENGTH)
        if request.content_length and request.content_length > MAX_BODY_BYTES:
            return jsonify({"accepted": False, "error": "payload_too_large"}), 413

        # Content-Type verification
        if not request.is_json:
            return jsonify({"accepted": False, "error": "unsupported_media_type"}), 415

        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            return jsonify({
                "accepted": False,
                "error": "invalid_request",
                "details": {"body": "JSON object payload is required"},
            }), 400

        # Honeypot verification: website field
        raw_website = data.get("website")
        if isinstance(raw_website, str) and raw_website.strip():
            # Bot detected: return accepted contract without sending email
            fake_request_id = uuid.uuid4().hex
            logger.info("request_id=%s route=/v1/kitchen-exhaust-requests outcome=honeypot_dropped", fake_request_id)
            return jsonify({"accepted": True, "request_id": fake_request_id}), 201

        # Field validation
        errors = {}

        # 1. Email field
        raw_email = data.get("email")
        if not isinstance(raw_email, str):
            errors["email"] = "Email is required and must be a string."
        elif any(c in "\r\n" or ord(c) < 32 or ord(c) == 127 for c in raw_email):
            errors["email"] = "Email contains invalid control characters."
        else:
            email = raw_email.strip()
            if len(email) == 0:
                errors["email"] = "Email is required."
            elif len(email) > 254:
                errors["email"] = "Email must not exceed 254 characters."
            elif not EMAIL_REGEX.match(email):
                errors["email"] = "Email format is invalid."

        # 2. Project details field
        raw_details = data.get("project_details")
        if not isinstance(raw_details, str):
            errors["project_details"] = "Project details are required and must be a string."
        else:
            normalized_details = raw_details.replace("\r\n", "\n").replace("\r", "\n").strip()
            if len(normalized_details) < 10:
                errors["project_details"] = "Project details must be at least 10 characters."
            elif len(normalized_details) > 2000:
                errors["project_details"] = "Project details must not exceed 2000 characters."

        # 3. Source page field (optional, default: kitchen-exhaust-reports)
        raw_source_page = data.get("source_page")
        if raw_source_page is None:
            source_page = "kitchen-exhaust-reports"
        elif isinstance(raw_source_page, str) and raw_source_page.strip() == "kitchen-exhaust-reports":
            source_page = "kitchen-exhaust-reports"
        else:
            errors["source_page"] = "Invalid source_page identifier."

        if errors:
            # Safe field validation errors; does not echo submitted values
            return jsonify({
                "accepted": False,
                "error": "invalid_request",
                "details": errors,
            }), 400

        # SMTP dispatch
        request_id = uuid.uuid4().hex
        success = _send_notification_email(
            app=app,
            request_id=request_id,
            submitted_email=email,
            project_details=normalized_details,
            source_page=source_page,
        )

        if not success:
            return jsonify({
                "accepted": False,
                "error": "temporarily_unavailable",
            }), 503

        logger.info("request_id=%s route=/v1/kitchen-exhaust-requests outcome=accepted", request_id)
        return jsonify({"accepted": True, "request_id": request_id}), 201

    return app


def _send_notification_email(
    app: Flask,
    request_id: str,
    submitted_email: str,
    project_details: str,
    source_page: str,
) -> bool:
    """Construct and dispatch notification email via authenticated SMTP.
    
    Returns True on successful transmission, False otherwise.
    Never exposes passwords or sensitive credentials in logs.
    """
    smtp_host = app.config.get("SMTP_HOST", "").strip()
    smtp_port = app.config.get("SMTP_PORT", 587)
    smtp_user = app.config.get("SMTP_USERNAME", "").strip()
    smtp_pass = app.config.get("SMTP_PASSWORD", "")
    smtp_from = app.config.get("SMTP_FROM", "").strip()
    smtp_to = app.config.get("SMTP_TO", "").strip()
    smtp_security = (app.config.get("SMTP_SECURITY") or "").strip().lower()

    # Fail closed if essential SMTP configuration is missing
    if not smtp_host or not smtp_from or not smtp_to:
        logger.warning(
            "request_id=%s route=/v1/kitchen-exhaust-requests outcome=smtp_config_missing",
            request_id,
        )
        return False

    # Validate security mode against explicit allow-list
    allowed_security_modes = {"starttls", "ssl", "tls", "none"}
    if smtp_security not in allowed_security_modes:
        logger.warning(
            "request_id=%s route=/v1/kitchen-exhaust-requests outcome=smtp_invalid_security_mode mode=%s",
            request_id,
            smtp_security,
        )
        return False

    # Fail closed policy: SMTP_SECURITY=none is permitted ONLY for local test catchers or testing mode
    if smtp_security == "none":
        is_local_host = smtp_host in {"localhost", "127.0.0.1", "::1"}
        is_testing = app.config.get("TESTING", False)
        if not (is_local_host or is_testing):
            logger.warning(
                "request_id=%s route=/v1/kitchen-exhaust-requests outcome=smtp_insecure_mode_rejected host=%s",
                request_id,
                smtp_host,
            )
            return False

    # Build plain-text UTF-8 email message
    now_utc = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    msg = EmailMessage()
    msg["Subject"] = f"[Kitchen Exhaust Demo] New sample request {request_id}"
    msg["From"] = smtp_from  # Strictly server configured; never user input
    msg["To"] = smtp_to
    msg["Reply-To"] = submitted_email  # Validated submitted email

    body = (
        f"[Kitchen Exhaust Demo] New sample request received\n"
        f"--------------------------------------------------\n"
        f"Request ID:       {request_id}\n"
        f"Received At (UTC): {now_utc}\n"
        f"Submitted Email:  {submitted_email}\n"
        f"Source Page:      {source_page}\n\n"
        f"Project Details:\n"
        f"{project_details}\n"
    )
    msg.set_content(body)

    timeout_seconds = 10.0
    ssl_context = ssl.create_default_context()

    try:
        if smtp_security in {"ssl", "tls"}:
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=timeout_seconds, context=ssl_context) as server:
                if smtp_user and smtp_pass:
                    server.login(smtp_user, smtp_pass)
                server.send_message(msg)
        elif smtp_security == "starttls":
            with smtplib.SMTP(smtp_host, smtp_port, timeout=timeout_seconds) as server:
                server.starttls(context=ssl_context)
                if smtp_user and smtp_pass:
                    server.login(smtp_user, smtp_pass)
                server.send_message(msg)
        else:  # 'none'
            with smtplib.SMTP(smtp_host, smtp_port, timeout=timeout_seconds) as server:
                if smtp_user and smtp_pass:
                    server.login(smtp_user, smtp_pass)
                server.send_message(msg)

        return True
    except Exception as exc:
        logger.error(
            "request_id=%s route=/v1/kitchen-exhaust-requests outcome=smtp_failure exception=%s",
            request_id,
            exc.__class__.__name__,
        )
        return False


# Module-level WSGI entry point for Hostido / DirectAdmin
application = create_app()

if __name__ == "__main__":
    # Local development server helper
    application.run(host="127.0.0.1", port=5000, debug=True)
