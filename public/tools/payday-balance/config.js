/**
 * Self-hosted configuration for v2 consented usage measurement.
 * Set enabled: true only after deploying and verifying backend/cash_timing_metrics/.
 * No credentials or admin tokens belong in this file.
 */
window.KF_PAYDAY_METRICS_CONFIG = {
  enabled: false,
  eventsEndpoint: "https://api.kf-software.com/cash-timing/events",
  forgetEndpoint: "https://api.kf-software.com/cash-timing/forget",
  timeoutMs: 3500
};
