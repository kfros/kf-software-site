import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const htmlPath = path.resolve("out/tools/payday-balance/index.html");

if (!fs.existsSync(htmlPath)) {
  console.error(`Missing exported file: ${htmlPath}`);
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, "utf8");

// Remove any prior CSP meta tag before computing inline script hashes
html = html.replace(
  /<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/gi,
  ""
);

const inlineScriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
const hashes = new Set();
let match;

while ((match = inlineScriptRe.exec(html)) !== null) {
  const scriptBody = match[1];
  if (scriptBody && scriptBody.length > 0) {
    const sha256 = crypto
      .createHash("sha256")
      .update(scriptBody, "utf8")
      .digest("base64");
    hashes.add(`'sha256-${sha256}'`);
  }
}

const scriptSrc = ["'self'", ...Array.from(hashes)].join(" ");
const cspContent = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://eu.i.posthog.com",
  "form-action 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const cspMeta = `<meta http-equiv="Content-Security-Policy" content="${cspContent}"/>`;
html = html.replace("<head>", `<head>${cspMeta}`);

fs.writeFileSync(htmlPath, html, "utf8");
console.log(
  `Injected production CSP into out/tools/payday-balance/index.html (${hashes.size} inline script SHA-256 hashes).`
);
