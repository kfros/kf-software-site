"""Automated test suite for Kitchen Exhaust WSGI backend.

All SMTP interactions are mocked; automated tests never contact a real mail server.
"""

import json
from unittest.mock import MagicMock, patch

import pytest
from backend.kitchen_exhaust.app import create_app

VALID_ORIGIN = "https://kf-software.com"
LOCAL_ORIGIN = "http://localhost:3000"
UNAPPROVED_ORIGIN = "https://malicious-site.example.com"

BASE_CONFIG = {
    "TESTING": True,
    "ALLOWED_ORIGINS": f"{VALID_ORIGIN},{LOCAL_ORIGIN}",
    "SMTP_HOST": "mail.example.com",
    "SMTP_PORT": 587,
    "SMTP_USERNAME": "test_user",
    "SMTP_PASSWORD": "test_password",
    "SMTP_FROM": "noreply@kf-software.com",
    "SMTP_TO": "inbox@kf-software.com",
    "SMTP_SECURITY": "starttls",
}


@pytest.fixture
def app():
    """Create test application with standard test configuration."""
    test_app = create_app(BASE_CONFIG)
    return test_app


@pytest.fixture
def client(app):
    """Test client fixture."""
    return app.test_client()


# -----------------------------------------------------------------------------
# 1. Health Endpoint Tests
# -----------------------------------------------------------------------------
def test_health_check_success(client):
    """GET /health returns 200 and the exact public response contract."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}


def test_health_check_independent_of_smtp(client):
    """GET /health succeeds even when SMTP configuration is completely missing."""
    empty_app = create_app({"TESTING": True})
    empty_client = empty_app.test_client()
    response = empty_client.get("/health")
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}


# -----------------------------------------------------------------------------
# 2. Valid Request & SMTP Delivery Tests
# -----------------------------------------------------------------------------
@patch("smtplib.SMTP")
def test_valid_request_sends_email_and_returns_201(mock_smtp_class, client):
    """Valid POST sends exactly one SMTP message and returns 201 with request_id."""
    mock_instance = MagicMock()
    mock_smtp_class.return_value.__enter__.return_value = mock_instance

    payload = {
        "email": "client@example.com",
        "project_details": "We require exhaust compliance review for a commercial bakery.",
        "source_page": "kitchen-exhaust-reports",
    }

    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json=payload,
        headers={"Origin": VALID_ORIGIN},
    )

    assert response.status_code == 201
    data = response.get_json()
    assert data["accepted"] is True
    assert "request_id" in data
    assert len(data["request_id"]) == 32  # UUID4 hex string

    # Verify SMTP interaction
    mock_instance.starttls.assert_called_once()
    mock_instance.login.assert_called_once_with("test_user", "test_password")
    mock_instance.send_message.assert_called_once()

    sent_msg = mock_instance.send_message.call_args[0][0]
    # Check headers
    assert sent_msg["From"] == "noreply@kf-software.com"
    assert sent_msg["To"] == "inbox@kf-software.com"
    assert sent_msg["Reply-To"] == "client@example.com"
    assert f"[Kitchen Exhaust Demo] New sample request {data['request_id']}" in sent_msg["Subject"]

    # Check body content
    content = sent_msg.get_content()
    assert data["request_id"] in content
    assert "client@example.com" in content
    assert "commercial bakery" in content
    assert "kitchen-exhaust-reports" in content


@patch("smtplib.SMTP_SSL")
def test_valid_request_with_ssl(mock_smtp_ssl_class):
    """Valid POST with SMTP_SECURITY=ssl uses SMTP_SSL."""
    ssl_app = create_app({
        **BASE_CONFIG,
        "SMTP_PORT": 465,
        "SMTP_SECURITY": "ssl",
    })
    ssl_client = ssl_app.test_client()

    mock_instance = MagicMock()
    mock_smtp_ssl_class.return_value.__enter__.return_value = mock_instance

    payload = {
        "email": "client@example.com",
        "project_details": "Valid details for SSL delivery check.",
    }

    response = ssl_client.post(
        "/v1/kitchen-exhaust-requests",
        json=payload,
        headers={"Origin": VALID_ORIGIN},
    )

    assert response.status_code == 201
    mock_instance.send_message.assert_called_once()


# -----------------------------------------------------------------------------
# 3. Validation Negative Tests (No SMTP Calls)
# -----------------------------------------------------------------------------
@patch("smtplib.SMTP")
def test_invalid_email_syntax_rejected(mock_smtp, client):
    """Invalid email syntax returns 400 and sends no email."""
    for bad_email in ["notanemail", "user@", "@domain.com", "user@domain"]:
        response = client.post(
            "/v1/kitchen-exhaust-requests",
            json={
                "email": bad_email,
                "project_details": "Valid project details for test.",
            },
            headers={"Origin": VALID_ORIGIN},
        )
        assert response.status_code == 400
        data = response.get_json()
        assert data["accepted"] is False
        assert data["error"] == "invalid_request"
        assert "email" in data["details"]
        # Ensure user input is not echoed in raw error
        assert bad_email not in json.dumps(data)
        mock_smtp.assert_not_called()


@patch("smtplib.SMTP")
def test_email_with_cr_or_lf_rejected(mock_smtp, client):
    """Email containing CR or LF is rejected with 400 to prevent header injection."""
    for injection in ["user@example.com\r\nBcc: evil@example.com", "user@example.com\n", "user\r@example.com"]:
        response = client.post(
            "/v1/kitchen-exhaust-requests",
            json={
                "email": injection,
                "project_details": "Valid details for header injection test.",
            },
            headers={"Origin": VALID_ORIGIN},
        )
        assert response.status_code == 400
        data = response.get_json()
        assert data["accepted"] is False
        assert "email" in data["details"]
        mock_smtp.assert_not_called()


@patch("smtplib.SMTP")
def test_email_exceeding_254_chars_rejected(mock_smtp, client):
    """Email longer than 254 characters is rejected with 400."""
    long_email = "a" * 245 + "@example.com"
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": long_email,
            "project_details": "Valid project details here.",
        },
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 400
    mock_smtp.assert_not_called()


@patch("smtplib.SMTP")
def test_project_details_too_short(mock_smtp, client):
    """Project details shorter than 10 characters returns 400."""
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "Short",
        },
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 400
    data = response.get_json()
    assert data["accepted"] is False
    assert "project_details" in data["details"]
    mock_smtp.assert_not_called()


@patch("smtplib.SMTP")
def test_project_details_too_long(mock_smtp, client):
    """Project details longer than 2000 characters returns 400."""
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "A" * 2001,
        },
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 400
    mock_smtp.assert_not_called()


@patch("smtplib.SMTP")
def test_invalid_source_page_rejected(mock_smtp, client):
    """Unapproved source_page value returns 400."""
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "Valid details for testing source_page.",
            "source_page": "unauthorized-landing-page",
        },
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 400
    data = response.get_json()
    assert "source_page" in data["details"]
    mock_smtp.assert_not_called()


# -----------------------------------------------------------------------------
# 4. Honeypot Behavior
# -----------------------------------------------------------------------------
@patch("smtplib.SMTP")
def test_honeypot_website_field_suppresses_email(mock_smtp, client):
    """A non-empty honeypot field returns generic 201 accepted but sends no email."""
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "bot@example.com",
            "project_details": "Spam project details payload text.",
            "website": "http://spamsite.example.com",
        },
        headers={"Origin": VALID_ORIGIN},
    )

    assert response.status_code == 201
    data = response.get_json()
    assert data["accepted"] is True
    assert "request_id" in data
    mock_smtp.assert_not_called()


# -----------------------------------------------------------------------------
# 5. Payload & Media Type Constraints
# -----------------------------------------------------------------------------
@patch("smtplib.SMTP")
def test_oversized_payload_returns_413(mock_smtp, client):
    """Request body exceeding MAX_CONTENT_LENGTH (16384 bytes) returns 413."""
    oversized_text = "x" * 17000
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        data=json.dumps({
            "email": "client@example.com",
            "project_details": oversized_text,
        }),
        content_type="application/json",
        headers={"Origin": VALID_ORIGIN},
    )

    assert response.status_code == 413
    data = response.get_json()
    assert data["accepted"] is False
    assert data["error"] == "payload_too_large"
    mock_smtp.assert_not_called()


@patch("smtplib.SMTP")
def test_unsupported_media_type_returns_415(mock_smtp, client):
    """Non-JSON Content-Type returns 415."""
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        data="email=client@example.com&project_details=hello+world",
        content_type="application/x-www-form-urlencoded",
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 415
    data = response.get_json()
    assert data["accepted"] is False
    assert data["error"] == "unsupported_media_type"
    mock_smtp.assert_not_called()


# -----------------------------------------------------------------------------
# 6. CORS & Origin Boundary Tests
# -----------------------------------------------------------------------------
@patch("smtplib.SMTP")
def test_missing_origin_rejected(mock_smtp, client):
    """Request missing Origin header returns 403 and sends no email."""
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "Valid project details without origin.",
        },
    )
    assert response.status_code == 403
    assert "Access-Control-Allow-Origin" not in response.headers
    mock_smtp.assert_not_called()


@patch("smtplib.SMTP")
def test_unapproved_origin_rejected(mock_smtp, client):
    """Request from unapproved Origin returns 403, emits no CORS headers, sends no email."""
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "Valid project details from bad origin.",
        },
        headers={"Origin": UNAPPROVED_ORIGIN},
    )
    assert response.status_code == 403
    assert "Access-Control-Allow-Origin" not in response.headers
    mock_smtp.assert_not_called()


def test_approved_origin_receives_cors_headers(client):
    """Approved Origin receives exact Access-Control-Allow-Origin and Vary: Origin."""
    with patch("smtplib.SMTP") as mock_smtp:
        mock_instance = MagicMock()
        mock_smtp.return_value.__enter__.return_value = mock_instance

        response = client.post(
            "/v1/kitchen-exhaust-requests",
            json={
                "email": "client@example.com",
                "project_details": "Valid project details for CORS test.",
            },
            headers={"Origin": VALID_ORIGIN},
        )

        assert response.status_code == 201
        assert response.headers.get("Access-Control-Allow-Origin") == VALID_ORIGIN
        assert "Origin" in response.headers.get("Vary", "")
        assert "Access-Control-Allow-Credentials" not in response.headers


def test_cors_preflight_options(client):
    """OPTIONS returns 204 with approved methods, headers, and CORS."""
    response = client.open(
        "/v1/kitchen-exhaust-requests",
        method="OPTIONS",
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 204
    assert response.headers.get("Access-Control-Allow-Origin") == VALID_ORIGIN
    assert "POST, OPTIONS" in response.headers.get("Access-Control-Allow-Methods", "")
    assert "Content-Type" in response.headers.get("Access-Control-Allow-Headers", "")
    assert "Origin" in response.headers.get("Vary", "")


def test_cors_preflight_unapproved_origin(client):
    """OPTIONS with unapproved Origin returns 403 and emits no CORS headers."""
    response = client.open(
        "/v1/kitchen-exhaust-requests",
        method="OPTIONS",
        headers={"Origin": UNAPPROVED_ORIGIN},
    )
    assert response.status_code == 403
    assert "Access-Control-Allow-Origin" not in response.headers


# -----------------------------------------------------------------------------
# 7. Mandatory Correction 2: CORS on Error Responses
# -----------------------------------------------------------------------------
def test_cors_headers_on_validation_400(client):
    """Approved Origin receives CORS headers on validation 400 error."""
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={"email": "bad", "project_details": "Short"},
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 400
    assert response.headers.get("Access-Control-Allow-Origin") == VALID_ORIGIN
    assert "Origin" in response.headers.get("Vary", "")


def test_cors_headers_on_oversized_413(client):
    """Approved Origin receives CORS headers on payload_too_large 413 error."""
    oversized_text = "x" * 17000
    response = client.post(
        "/v1/kitchen-exhaust-requests",
        data=json.dumps({"email": "client@example.com", "project_details": oversized_text}),
        content_type="application/json",
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 413
    assert response.headers.get("Access-Control-Allow-Origin") == VALID_ORIGIN
    assert "Origin" in response.headers.get("Vary", "")


@patch("smtplib.SMTP")
def test_cors_headers_on_smtp_failure_503(mock_smtp, client):
    """Approved Origin receives CORS headers on SMTP failure 503 error."""
    mock_instance = MagicMock()
    mock_instance.send_message.side_effect = OSError("Connection dropped")
    mock_smtp.return_value.__enter__.return_value = mock_instance

    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "Valid project details for 503 CORS test.",
        },
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 503
    assert response.headers.get("Access-Control-Allow-Origin") == VALID_ORIGIN
    assert "Origin" in response.headers.get("Vary", "")


# -----------------------------------------------------------------------------
# 8. SMTP Failure & Security Policy Tests
# -----------------------------------------------------------------------------
@patch("smtplib.SMTP")
def test_smtp_transport_failure_returns_503(mock_smtp, client):
    """SMTP network error returns 503 without exposing raw exception details."""
    mock_instance = MagicMock()
    mock_instance.send_message.side_effect = Exception("Internal socket crash")
    mock_smtp.return_value.__enter__.return_value = mock_instance

    response = client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "Valid project details for failure test.",
        },
        headers={"Origin": VALID_ORIGIN},
    )

    assert response.status_code == 503
    data = response.get_json()
    assert data["accepted"] is False
    assert data["error"] == "temporarily_unavailable"
    assert "Internal socket crash" not in json.dumps(data)


def test_missing_smtp_configuration_returns_503():
    """Missing SMTP configuration returns 503 on POST, while /health remains 200."""
    unconfigured_app = create_app({
        "TESTING": True,
        "ALLOWED_ORIGINS": VALID_ORIGIN,
        # SMTP host/from/to left unset
    })
    test_client = unconfigured_app.test_client()

    # Health remains ok
    assert test_client.get("/health").status_code == 200

    # Request returns 503
    response = test_client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "Valid project details here.",
        },
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 503
    assert response.get_json()["error"] == "temporarily_unavailable"


def test_smtp_security_none_rejected_on_remote_host():
    """SMTP_SECURITY=none fails closed with 503 when host is not local loopback."""
    remote_insecure_app = create_app({
        **BASE_CONFIG,
        "TESTING": False,  # enforce production check
        "SMTP_HOST": "mail.remote-production.com",
        "SMTP_SECURITY": "none",
    })
    test_client = remote_insecure_app.test_client()

    response = test_client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "Valid project details here.",
        },
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 503
    assert response.get_json()["error"] == "temporarily_unavailable"


def test_smtp_invalid_security_mode_fails_closed():
    """Unrecognized SMTP_SECURITY mode fails closed with 503."""
    bad_sec_app = create_app({
        **BASE_CONFIG,
        "SMTP_SECURITY": "unsupported_protocol",
    })
    test_client = bad_sec_app.test_client()

    response = test_client.post(
        "/v1/kitchen-exhaust-requests",
        json={
            "email": "client@example.com",
            "project_details": "Valid project details here.",
        },
        headers={"Origin": VALID_ORIGIN},
    )
    assert response.status_code == 503
    assert response.get_json()["error"] == "temporarily_unavailable"


def test_method_not_allowed(client):
    """GET /v1/kitchen-exhaust-requests returns 405."""
    response = client.get("/v1/kitchen-exhaust-requests")
    assert response.status_code == 405
    data = response.get_json()
    assert data["accepted"] is False
    assert data["error"] == "method_not_allowed"
