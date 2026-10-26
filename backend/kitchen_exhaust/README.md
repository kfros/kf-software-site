# Kitchen Exhaust Demo WSGI Request API

Minimal, secure, production-ready Flask WSGI service that accepts Kitchen Exhaust sample requests from the static frontend (`https://kf-software.com`) and dispatches notification emails via authenticated SMTP without storing customer data.

---

## 1. Architecture & Design Principles

- **Framework:** Flask 3.1.3 (WSGI)
- **Startup File:** `app.py`
- **WSGI Entry Point:** `application`
- **Application Factory:** `create_app(test_config=None)`
- **Static Invariant:** Completely isolated from `src/app`. The Next.js frontend remains 100% static (`output: 'export'`).
- **Zero Persistence:** Submissions are never stored in a database, local disk, or cache.
- **Privacy & Sanitization:** Passwords, customer emails, and project descriptions are never logged. Logs record only timestamps, request IDs, endpoints, outcome categories, and exception classes.
- **Abuse Prevention:**
  - Request body capped at 16 KB (`MAX_CONTENT_LENGTH = 16384`) with a JSON `413` response.
  - Honeypot `website` field silently accepted (`201`) without SMTP dispatch.
  - Strict `Origin` allow-list. Non-matching or missing browser origins receive `403 Forbidden`.
  - Header injection prevention: CR/LF and non-printable control characters in emails are rejected (`400`).
- **CORS Boundary:**
  - Browser requests require an `Origin` present in `ALLOWED_ORIGINS`.
  - Successful and error responses (`400`, `413`, `415`, `405`, `500`, `503`) emit `Access-Control-Allow-Origin: <origin>` and `Vary: Origin` for approved origins.
  - *Note:* Origin checking is a browser security boundary, not cryptographic authentication, as non-browser clients can spoof headers.

---

## 2. Environment Variables & Configuration

The application reads strictly from standard environment variables via `os.environ`. There is no custom `.env` parser or production dotenv dependency. See `.env.example` for reference placeholders.

| Variable | Required | Default | Description |
|---|---|---|---|
| `SMTP_HOST` | Yes | - | SMTP hostname (e.g., `mail.kf-software.com`) |
| `SMTP_PORT` | No | `587` | SMTP port (e.g., `587` for STARTTLS, `465` for SSL) |
| `SMTP_USERNAME` | No | - | SMTP authentication username |
| `SMTP_PASSWORD` | No | - | SMTP authentication password |
| `SMTP_FROM` | Yes | - | System sender address (e.g., `noreply@kf-software.com`). Never user input. |
| `SMTP_TO` | Yes | - | Destination mailbox (e.g., `requests@kf-software.com`) |
| `SMTP_SECURITY` | No | `starttls` | Security protocol: `starttls`, `ssl` (or `tls`), or `none` (local testing only) |
| `ALLOWED_ORIGINS` | Yes | - | Comma-separated list of allowed browser origins |

> **Security Note on `SMTP_SECURITY=none`:**  
> The application fails closed (`503`) if `SMTP_SECURITY=none` is used with a remote/production host. Plaintext SMTP is permitted only for `localhost`, `127.0.0.1`, `::1`, or in automated test mode.

---

## 3. Local Development Guide

### 3.1 Setup Virtual Environment
```bash
# 1. Create virtual environment
python -m venv backend/kitchen_exhaust/venv

# 2. Activate virtual environment
# Windows PowerShell:
.\backend\kitchen_exhaust\venv\Scripts\Activate.ps1
# Linux/macOS Bash:
source backend/kitchen_exhaust/venv/bin/activate

# 3. Install development and test dependencies
python -m pip install -r backend/kitchen_exhaust/requirements-dev.txt

# 4. Verify dependency integrity
python -m pip check
```

### 3.2 Setting Environment Variables Locally

#### In Windows PowerShell:
```powershell
$env:SMTP_HOST = "127.0.0.1"
$env:SMTP_PORT = "1025"
$env:SMTP_FROM = "noreply@kf-software.com"
$env:SMTP_TO = "dev-inbox@kf-software.com"
$env:SMTP_SECURITY = "none"
$env:ALLOWED_ORIGINS = "https://kf-software.com,http://localhost:3000,http://127.0.0.1:3000"
```

#### In Bash / macOS / Linux:
```bash
export SMTP_HOST="127.0.0.1"
export SMTP_PORT="1025"
export SMTP_FROM="noreply@kf-software.com"
export SMTP_TO="dev-inbox@kf-software.com"
export SMTP_SECURITY="none"
export ALLOWED_ORIGINS="https://kf-software.com,http://localhost:3000,http://127.0.0.1:3000"
```

### 3.3 Running Automated Tests
```bash
python -m pytest backend/kitchen_exhaust/tests -v
```

### 3.4 Running the Local Development Server
```bash
python backend/kitchen_exhaust/app.py
# Server starts at http://127.0.0.1:5000
```

---

## 4. API Endpoints

### 4.1 Health Check
- **Endpoint:** `GET /health`
- **Response (200 OK):**
  ```json
  {
    "status": "ok"
  }
  ```

### 4.2 Submit Kitchen Exhaust Request
- **Endpoint:** `POST /v1/kitchen-exhaust-requests`
- **Required Header:** `Origin: https://kf-software.com` (or other approved origin)
- **Content-Type:** `application/json`
- **Request Body (JSON):**
  ```json
  {
    "email": "engineer@restaurant.com",
    "project_details": "Need exhaust fan volume and hood clearance calculation.",
    "source_page": "kitchen-exhaust-reports",
    "website": ""
  }
  ```
- **Responses:**
  - `201 Created`: `{"accepted": true, "request_id": "<uuid4_hex>"}`
  - `400 Bad Request`: `{"accepted": false, "error": "invalid_request", "details": {...}}`
  - `403 Forbidden`: `{"accepted": false, "error": "forbidden"}` (unapproved origin)
  - `413 Payload Too Large`: `{"accepted": false, "error": "payload_too_large"}` (> 16 KB)
  - `415 Unsupported Media Type`: `{"accepted": false, "error": "unsupported_media_type"}`
  - `503 Service Unavailable`: `{"accepted": false, "error": "temporarily_unavailable"}` (SMTP dispatch failed)

---

## 5. Hostido DirectAdmin Deployment Checklist

This runbook is intended for the human operator deploying the service to Hostido.

### Step 1: Subdomain Setup
1. In DirectAdmin, create the subdomain `api.kf-software.com`.
2. Ensure DNS records for `api.kf-software.com` point to the Hostido server.
3. Install an SSL/TLS certificate (Let's Encrypt) for `api.kf-software.com` via DirectAdmin SSL Certificates.

### Step 2: Create Python Application in DirectAdmin
1. Navigate to **Aplikacje PHP i Python** -> **Zarządzaj aplikacjami Python**.
2. Click **UTWÓRZ APLIKACJĘ** (Create Application).
3. Configure the application parameters:
   - **Wersja Python (Python Version):** Python 3.11.x (or recommended Python 3.x).
   - **Katalog główny aplikacji (Application Root):** Path to the directory where backend files reside (e.g. `domains/api.kf-software.com/app`).
   - **URL aplikacji (Application URL):** Select `api.kf-software.com`.
   - **Plik startowy aplikacji (Application Startup File):** `app.py`.
   - **Punkt wejścia aplikacji (Application Entry Point):** `application`.
4. Click **CREATE**.

### Step 3: Install Production Dependencies
1. Connect to Hostido via SSH.
2. Activate the application virtual environment using the command displayed in the DirectAdmin Python App Manager (e.g., `source /home/<user>/virtualenv/domains/api.kf-software.com/app/3.11/bin/activate`).
3. Navigate to the application root directory.
4. Run:
   ```bash
   python -m pip install -r requirements.txt
   python -m pip check
   ```

### Step 4: Production Secret Injection (Mandatory Prerequisite)
> **CRITICAL PREREQUISITE:** The human operator must confirm the secure, non-public secret-injection mechanism available in Hostido DirectAdmin before live deployment.
- Check if DirectAdmin Python App Manager provides an "Environment Variables" section for the application.
- If not available, configure variables via Apache/LiteSpeed directives in `.htaccess` (e.g., `SetEnv SMTP_HOST "..."`) or an uncommitted server startup wrapper outside the public web root.
- **Under no circumstances should secret credentials be committed to git or stored in publicly accessible files.**
- If no non-public secret mechanism is supported, **HALT** deployment until one is established.

### Step 5: Restart Application & Verify
1. In DirectAdmin Python App Manager, click **RESTART**.
2. Run a smoke test against the health endpoint:
   ```bash
   curl -i https://api.kf-software.com/health
   # Expected output: HTTP/2 200, Content-Type: application/json, {"status": "ok"}
   ```
3. Send one manual test submission with an approved Origin header:
   ```bash
   curl -i -X POST https://api.kf-software.com/v1/kitchen-exhaust-requests \
     -H "Origin: https://kf-software.com" \
     -H "Content-Type: application/json" \
     -d '{"email":"operator@kf-software.com","project_details":"Smoke test post-deployment verification","source_page":"kitchen-exhaust-reports"}'
   ```
4. Confirm:
   - Response status is `201 Created` with a `request_id`.
   - Exactly one email arrives at `SMTP_TO`.
   - Inspect `stderr.log` / server log to ensure no passwords, emails, or request bodies were logged.
