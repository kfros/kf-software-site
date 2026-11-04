# Kitchen Exhaust Experiment Measurement Architecture (v1)

## 1. Purpose and Experiment Version
- **Experiment Identifier**: `ke_v1`
- **Experiment Surface**: `kitchen_exhaust_reports` (`/kitchen-exhaust-reports/`)
- **Target Audience & Cohort**: Kitchen Exhaust Cohort 2 (10 commercial kitchen exhaust cleaning and inspection contractors)
- **Primary Objective**: Measure asynchronous buyer validation signals for automated kitchen exhaust service photo report generation. The measurement layer provides quantitative behavioral telemetry on customer attention, form engagement, and request submissions using our privacy-safe Microsoft Clarity integration, without adding external third-party tracking libraries, cookies, or backend overhead.

---

## 2. Event and Custom-Tag Dictionary

### 2.1 Funnel Events
All events are centralized in `src/lib/clarity.ts` and triggered via typed helper functions:

| Event Name | Helper Function | Description / User Action |
| :--- | :--- | :--- |
| `ke_pdf_open` | `trackKePdfOpen()` | User clicks the "View sample PDF" link to view the fictional demonstration report. |
| `ke_pdf_download` | `trackKePdfDownload()` | User clicks the "Download sample PDF" link to save the sample report document. |
| `ke_form_start` | `trackKeFormStart()` | User types the first character in either the Work Email or Project Details input field. |
| `ke_form_submit_attempt` | `trackKeFormSubmitAttempt()` | User submits the form and client validation passes; fired immediately before network `fetch()`. |
| `ke_form_submit_success` | `trackKeFormSubmitSuccess()` | Backend responds with HTTP 201 and `{ accepted: true }`. |
| `ke_form_submit_error` | `trackKeFormSubmitError(type)`| Submission attempt terminates in an error state (timeout, network, server, or unexpected). |

### 2.2 Custom Tags
Custom tags attach contextual experiment dimensions to the Clarity session:

| Tag Key | Example Value | Description |
| :--- | :--- | :--- |
| `experiment` | `"ke_v1"` | Experiment cohort release identifier. |
| `experiment_surface` | `"kitchen_exhaust_reports"` | Specific landing page / product surface. |
| `error_type` | `"timeout"` \| `"network"` \| `"server"` \| `"unexpected"` | Allowlisted classification of form submission failure. |
| `utm_source` | `"outreach"` \| `"community"` | Allowlisted campaign source (strict whitelist). |
| `utm_medium` | `"email"` \| `"social"` | Allowlisted campaign medium (strict whitelist). |
| `utm_campaign` | `"ke_cohort_2"` \| `"ke_cohort_3"` | Allowlisted campaign cohort identifier. |

---

## 3. Exact Firing Conditions and Deduplication Rules

1. **`ke_pdf_open` & `ke_pdf_download`**:
   - **Condition**: Dispatched strictly on explicit `onClick` events on the respective view or download anchor elements in `SamplePdfViewer`.
   - **Guard**: Never fired during initial page load, object component mount, scroll visibility, or iframe/object rendering.
   - **Deduplication**: Each user click represents an intentional engagement action. Multiple clicks fire separate events reflecting repeated interest.

2. **`ke_form_start`**:
   - **Condition**: Dispatched strictly on `onChange` of either `email` or `project_details` input fields when the first character is entered.
   - **Guard**: Never fired on focus, blur, click, scroll, or hover. The honeypot field (`website`) is strictly excluded.
   - **Deduplication**: Governed by `formStartedRef` (`useRef(false)`). Once set to `true`, subsequent keystrokes in either field will not re-trigger `ke_form_start` during that component session.

3. **`ke_form_submit_attempt`**:
   - **Condition**: Dispatched when the user clicks "Request a free sample" AND client-side validation passes.
   - **Guard**: If email is invalid, description is missing/too short, or honeypot is populated, client validation halts execution; no attempt event is dispatched.
   - **Deduplication**: Fires exactly once per validated submission attempt immediately prior to `fetch()`.

4. **`ke_form_submit_success` vs `ke_form_submit_error`**:
   - **Condition**: Fired when the request reaches a terminal state.
   - **Exclusivity**: Mutually exclusive for any given attempt. A single attempt terminates in either success OR error, never both.
   - **Error Types**:
     - `timeout`: Client request aborted by `AbortController` after 15 seconds.
     - `network`: Fetch threw a `TypeError` or offline connectivity failure.
     - `server`: HTTP 5xx or non-201 HTTP status code returned by the API.
     - `unexpected`: Malformed JSON or unexpected response format.
   - **Retries**: If a user corrects an error or retries, a subsequent validated submit triggers a new `ke_form_submit_attempt`, which resolves to exactly one new terminal event (`ke_form_submit_success` or `ke_form_submit_error`).

---

## 4. Privacy and Security Protections

### 4.1 Strict Exclusion of Personal and Sensitive Data
Under no circumstances is personal, confidential, or customer data transmitted to Microsoft Clarity:
- **No Email Addresses**: Neither raw nor hashed email addresses are sent as tags or events.
- **No Project Descriptions / Notes**: Customer technician notes or facility descriptions are never forwarded.
- **No Identifiers**: Backend `request_id`, customer IDs, or lead IDs are excluded.
- **No Response Payloads**: API responses and error messages are not forwarded.
- **No Arbitrary UTMs**: Only allowlisted query parameters matching known cohort values are stored. Any untrusted or lead-identifying parameters (e.g., `?lead_id=123`, `?email=...`) are ignored.
- **Form Masking**: Microsoft Clarity input masking is active across all form fields.

### 4.2 Consent Enforcement
- All analytics calls route through `trackClarityEvent()` and `setClarityTag()`.
- Both functions verify `getConsentDecision() === "accepted"` before calling `window.clarity()`.
- If the user declines consent or has not yet decided, analytics functions silently no-op.
- Form submission and PDF preview/download functionality remain 100% operational regardless of consent decision.

---

## 5. Signal-Strength Model

Telemetric indicators are categorized by increasing evidentiary value toward commercial validation:

```
[Raw Request] (Server log hit)
      ↓
[JS Session] (Clarity session recorded)
      ↓
[Attention] (Sample PDF viewed or downloaded)
      ↓
[Attempt] (Form interaction started / submit attempted)
      ↓
[Intent] (Form submission successfully accepted)
      ↓
[Real Signal] (Photos/notes emailed; report used in actual job)
      ↓
[Strong Signal] (Repeat service request, pilot agreement, or payment)
```

1. **`raw_request`**: HTTP GET recorded in Hostido access logs / AWStats. Indicates network reach, crawler indexing, or potential visitor arrival.
2. **`js_session`**: JavaScript session with analytics consent granted. Validates an active browser session.
3. **`attention`**: User clicked `ke_pdf_open` or `ke_pdf_download`. Indicates deliberate examination of report structure, photo layout, and defect documentation.
4. **`attempt`**: User initiated form typing (`ke_form_start`) and clicked submit with valid inputs (`ke_form_submit_attempt`). Indicates high engagement with the value proposition.
5. **`intent`**: Submission succeeded (`ke_form_submit_success`). User submitted contact details and requested custom report generation.
6. **`real_signal`**: Contractor replies to our follow-up email with actual job site photos and notes; contractor uses the generated report in client delivery or inspection submission.
7. **`strong_signal`**: Contractor requests additional reports, inquires about team pricing, agrees to a paid pilot, or requests an automated workflow.

---

## 6. How to Compare Clarity with Hostido Access Logs / AWStats

When analyzing traffic on `/kitchen-exhaust-reports/`:

| Dimension | Hostido Access Logs / AWStats | Microsoft Clarity |
| :--- | :--- | :--- |
| **Data Source** | Web server HTTP daemon (Apache/Nginx/LiteSpeed) | Client-side JavaScript snippet (`clarity.ms`) |
| **Coverage** | 100% of HTTP requests reaching the server | Only sessions where JS executed and consent was accepted |
| **Bot Inclusion** | Includes search bots, automated scrapers, uptime monitors, security scanners, cURL | Automatically filters known bots (with Clarity Bot Detection enabled) |
| **Privacy Blockers** | Unaffected by browser adblockers or privacy extensions | Blocked by uBlock Origin, Brave Shields, Pi-hole, strict corporate firewalls |
| **Consent Dependency**| Independent of user cookie/analytics consent | Strictly suppressed if user declines or ignores cookie banner |

### Reconciliation Guidelines:
- Hostido access logs represent total infrastructure traffic.
- Clarity represents the observed subset of engaged, consenting human browser sessions.
- Expect Hostido request counts to be significantly higher than Clarity session counts. Discrepancies are normal and expected in modern enterprise B2B environments.

---

## 7. Why Missing Clarity Data Does Not Prove Bot Traffic

A server log visit that does not correspond to a Clarity session must **never** be assumed to be a bot. In B2B contractor and commercial facilities domains, human visitors frequently do not generate analytics sessions due to:
1. **Analytics Consent Choices**: Visitors who decline or ignore the cookie/consent banner browse without triggering Clarity.
2. **Adblockers and DNS Filters**: Enterprise workstations, privacy-conscious technicians, and mobile adblockers frequently block `*.clarity.ms`.
3. **Browser Privacy Features**: Safari Advanced Tracking and Fingerprinting Protection, Firefox Enhanced Tracking Protection (Strict), and Brave Shields block third-party analytics by default.
4. **Corporate Firewalls and Proxies**: Enterprise network policies often strip or block third-party telemetry scripts.
5. **Disabled JavaScript**: Specialized reading environments or accessibility tools with limited scripting.

**Analytical Rule**: Treat server visits without Clarity sessions as *"uninstrumented traffic"*, not *"proven bot traffic"*.

---

## 8. Cohort 2 UTM Link Format

For Kitchen Exhaust Cohort 2 direct outreach, use strictly the following canonical link format:

```text
https://kf-software.com/kitchen-exhaust-reports/?utm_source=outreach&utm_medium=email&utm_campaign=ke_cohort_2
```

### Attribution Rules:
- **`utm_source=outreach`**: Identifies outbound direct email contact.
- **`utm_medium=email`**: Identifies email delivery medium.
- **`utm_campaign=ke_cohort_2`**: Identifies the 10-company discovery cohort.
- **No Personal Identifiers**: Never append recipient-specific parameters (such as `&company=xyz`, `&lead_id=123`, or `&email=...`). Attribution remains strictly aggregate.

---

## 9. Production Verification Checklist

Execute this checklist immediately following deployment and prior to initiating any Cohort 2 outreach:

- [ ] **Deployment Verification**: Confirm production site is live at `https://kf-software.com/kitchen-exhaust-reports/`.
- [ ] **Clarity Bot Detection**: In the Microsoft Clarity dashboard under Settings > Advanced, verify that **Bot Detection** is enabled.
- [ ] **Clean Browser Session**: Open an incognito/private browser session with network tools open.
- [ ] **Navigate with Campaign URL**: Navigate to `https://kf-software.com/kitchen-exhaust-reports/?utm_source=outreach&utm_medium=email&utm_campaign=ke_cohort_2`.
- [ ] **Accept Analytics Consent**: Click "Accept" on the analytics consent banner.
- [ ] **Verify Experiment Tags**: In DevTools console or network filter for `clarity`, confirm that tags `experiment="ke_v1"`, `experiment_surface="kitchen_exhaust_reports"`, `utm_source="outreach"`, `utm_medium="email"`, and `utm_campaign="ke_cohort_2"` are queued.
- [ ] **Test PDF Open Action**: Click "View sample PDF". Verify `ke_pdf_open` event is dispatched.
- [ ] **Test PDF Download Action**: Click "Download sample PDF". Verify `ke_pdf_download` event is dispatched.
- [ ] **Test Form Start Event**: Type a single character into the Work Email field. Verify `ke_form_start` event is dispatched once. Continue typing; verify no duplicate `ke_form_start` events fire.
- [ ] **Test Client Validation Gate**: Leave description empty and click "Request a free sample". Confirm client error appears and neither `ke_form_submit_attempt` nor `ke_form_submit_error` are sent.
- [ ] **Submit Controlled Test Request**: Fill in a valid test email and sample description (minimum 10 characters). Click submit.
- [ ] **Verify Attempt & Success Events**: Confirm `ke_form_submit_attempt` fires immediately before `fetch()`, followed by `ke_form_submit_success` upon HTTP 201 response.
- [ ] **Privacy Verification in Network Tab**: Inspect outgoing requests to `clarity.ms`. Confirm that entered email and project description strings **never** appear in query parameters, headers, or request payloads.
- [ ] **Email Delivery Check**: Confirm that notification email is received at `requests@kf-software.com` with the test request details.
- [ ] **Dashboard Confirmation**: After Clarity processing window (~15–30 minutes), confirm the session appears with custom tags and funnel events cleanly populated.

**Stop Condition**: If any sensitive field is observed in analytics payloads, or if the form fails to submit to the backend, halt outreach immediately, resolve the issue, and repeat this gate.

---

## 10. Experiment Outcome Mapping

Behavioral signals observed across Cohort 2 map to the following decision outcomes:

| Evidence Level | Observed Signals | Assessment & Next Steps |
| :--- | :--- | :--- |
| **Attention** | `ke_pdf_open`, `ke_pdf_download` | Validates contractor interest in professional photo inspection reports. Contractors are reviewing the output quality and structure. |
| **Attempt** | `ke_form_start`, `ke_form_submit_attempt` | Demonstrates active consideration. If attempts fail to convert to success, examine form friction, character limits, or trust barriers. |
| **Intent** | `ke_form_submit_success` | Strong buyer intent. Contractor has requested a demonstration report for a real job. Trigger immediate personalized follow-up. |
| **Real Signal** | Contractor emails photos/notes; uses generated report with building manager | **Core Validation Metric**: Confirms that automated photo defect reporting solves an active business problem in the contractor's daily operation. |
| **Strong Signal** | Repeat requests, pilot engagement, paid inquiries | **Commercial Validation**: Justifies advancing from manual/semi-automated prototype to full product build (Cohort 3 / v2 roadmap). |

