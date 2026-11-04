# KF Software Editorial Policy & Content Governance

This document establishes the editorial boundaries, track definitions, confidentiality requirements, and approval checklists for all public publications authored or published by **KF Software**.

---

## 1. Editorial Tracks

All public articles belong to one of four editorial tracks:

1. **Engineering Notes (`engineering-notes`)**  
   First-hand technical investigations, architectural choices, refactoring, migrations, backend reliability, and system stabilization (.NET, cloud, data pipelines, integrations).
2. **Product Build Notes (`product-build-notes`)**  
   Tradeoffs, design decisions, release notes, and operational reflections from building and maintaining focused KF Software products (e.g., ChillPup).
3. **Market Discovery (`market-discovery`)**  
   Observations, interviews, experiments, and buyer validation lessons. Inconclusive or abandoned hypotheses must be reported honestly; never rewrite negative validation as artificial traction.
4. **ChillPup Guides (`chillpup-guides`)**  
   Practical behavioral guidance for dog owners dealing with fireworks, night walks, rain hesitation, and daily stress. Must maintain strict veterinary and safety boundaries.

---

## 2. Evidence & Factual Grounding

- **First-hand work only:** Every non-ChillPup article must be grounded directly in first-hand engineering work, an active production system, or an explicitly documented KF Software experiment.
- **Engineering rigor:** Every engineering story must clearly identify:
  1. The concrete technical problem and operational context.
  2. The constraints (performance, backward compatibility, budget, time).
  3. The decision and alternatives considered.
  4. The explicit tradeoffs made.
  5. The observable result, metrics, or unresolved limitations.
- **Discovery integrity:** Every market-discovery story must explicitly distinguish between **observations** (what was seen or heard), **inferences** (interpretations), **decisions** (what we did next), and **remaining uncertainties**.
- **No invented traction:** Do not claim customer numbers, delivery teams, 24/7 support, guaranteed outcomes, certifications, response times, or cost savings that cannot be independently audited.

---

## 3. Confidentiality & Non-Disclosure

KF Software strictly protects the proprietary information, architecture, and identity of employers, clients, and partners:

- **Absolute Anonymization:** Never publish client names, employer names, project code names, internal system identifiers, private URLs, live credentials, or confidential business incidents.
- **Contextual Anonymity:** Anonymize systems, screenshots, database schemas, schemas, and timelines so that the entity is not identifiable even by industry peers through context or process specifics.
- **Prohibited Mentions:** Specifically prohibited from public mention: client names, confidential banking systems, migration code names, and private vendor relationships (including mPay or bank migration specifics).
- **Code Origin:** Never copy, paste, or adapt source code, proprietary algorithms, or architecture documents from a client or employer repository. All published code samples must be clean-room pedagogical recreations or original open-source snippets.

---

## 4. Publication Approval & Workflow

1. **Brief Stage:** Complete the `article-brief-template.md` and document evidence, identification risks, and reusable takeaways.
2. **Draft Stage:** Author the draft with status `status: "draft"` in the central article registry (`src/app/blog/blog-posts.ts`). Drafts are never exported to public static files or sitemaps.
3. **Confidentiality Review:** Conduct a line-by-line review against Section 3.
4. **Manual Owner Approval:** Only the studio founder (Kyryl Frosyniak) may approve changing status from `draft` to `published`.
5. **Static Export Verification:** Run `npm run typecheck`, `npm run lint`, and `npm run build` to verify clean static export and sitemap integration.

