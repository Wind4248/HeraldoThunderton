# loreleimlanierlaw.com

Website for **Lorelei M. Lanier**, estate-planning attorney, Upper Arlington, Ohio.
Joe Lotozo (her son) builds and maintains it. She is the practising attorney and the
final authority on anything the site says about the practice.

> **This is a real lawyer's real advertising.** Language here is regulated by the Ohio
> Rules of Professional Conduct. Treat copy changes on this site with more care than on a
> personal site — see **Compliance** below.

---

## Current State — September 23, 2026

A dedicated regulatory review is **in progress** (Ohio RPC 7.1–7.5, disclosure and
conflicts, FINRA/CFP Board exposure, ADA/WCAG, privacy). Nothing has been changed yet.
Findings will be recorded here when it completes.

**Already identified by reading the files, pending verification:**

| Where | What | Why it matters |
|---|---|---|
| `practice-areas.html:543` | Promotes Joe by name, names **Edward Jones** and his office, and offers a **free beneficiary review** | Two separate regimes: a possible conflict/referral issue for Lorelei, and a securities-advertising issue for Joe. **Highest-priority item.** |
| `about.html:203` | "one of the region's **most trusted** boutique estate planning practices" | Unsubstantiated comparative claim |
| `about.html:232` | "an **unmatched** command of Ohio probate law" | Unsubstantiated comparative claim |
| `about.html:230`, `:258`, `practice-areas.html:329` | "Deep **Expertise**", "expert" | Ohio restricts specialist/expert framing absent certification |
| `practice-areas.html` | Appears to be **missing** the "does not constitute legal advice" disclaimer that the other four pages carry | It is the most substantive legal-content page on the site |
| `about.html:~205` vs josephalotozo.com | "four decades of practice" vs "over 44 years of experience" | The two sites disagree, and both claims age silently |
| `llms.txt:30`, `index.html:~96` | **Business Succession Planning** claimed in llms.txt and homepage schema with **no page behind it** | Long-standing open item — either write the section or drop the claim |

**NOT an issue — do not re-flag:**
- `service-areas.html:456` "premier suburbs" / "top-rated schools" describes **Powell, Ohio**,
  not the practice. Superlatives about a town are not advertising claims about a lawyer.
- `practice-areas.html` `CFP&#174;` — `#174` is the `®` HTML entity, not a "#1" ranking claim.
- The self-reported `aggregateRating` previously noted in the homepage schema appears to be
  **gone**. Verified absent on 2026-09-23.

---

## Hosting

- GitHub Pages from **`Wind4248/HeraldoThunderton`** (repo name does not match the domain)
- Custom domain via `CNAME` → `loreleimlanierlaw.com`
- Push to `main` to deploy
- ⚠️ **The apex domain is canonical. `www` 301s to apex — never write `www` into a canonical.**
  Verified correct on all five pages as of 2026-09-23.

## Structure

```
index.html            practice-areas.html    service-areas.html
about.html            contact.html
css/style.css         ← EXTERNAL stylesheet (unlike josephalotozo.com, which is inline)
js/main.js
assets/images/        ← approved April 2026 shoot
llms.txt  robots.txt  sitemap.xml
```

Note the split from Joe's personal site: **this site uses external CSS/JS.** Do not
"helpfully" inline it to match the other project.

## Content Rules

- ⚠️ **Only photos from the approved April 2026 shoot may appear.** Joe's own Edward Jones
  photos are the one exception. Originals that were swapped out live in
  `assets/images/_replaced-originals/` — do not restore them.
- **Do not re-swap Lorelei's own photo selections.** She chose them.
- Every page must carry the "does not constitute legal advice / no attorney-client
  relationship" disclaimer.
- Avoid superlatives, comparisons and rankings about the practice. Say what she *does*,
  not that she is the best at it.
- Avoid "specialist", "certified", and — pending the review — "expert"/"expertise",
  unless a named certifying body backs it.
- Any claim of years of experience should be tied to a start year rather than a number
  that silently goes stale.

## Compliance

Two separate regimes apply, and they belong to two different people:

1. **Ohio Rules of Professional Conduct 7.1–7.5** — Lorelei's licence. Governs false or
   misleading communications, referrals and anything of value given for them, specialist
   claims, and firm identification. RPC 1.7/1.8 also matter where the site steers clients
   toward a family member who is compensated.
2. **FINRA Rule 2210 and Edward Jones policy, plus CFP Board marks rules** — Joe's
   registration. Any content naming Edward Jones or promoting his services is very likely
   a communication his firm must approve, *including on a third-party site he built*.

**Lorelei must review any copy change touching the practice.** Nothing in this file is
legal advice, and no automated review can certify compliance.

## Open

- Business Succession Planning claimed with no page behind it (see table above)
- No **privacy policy** on the site, while `contact.html` invites people to describe their
  family and estate situation — under review
- Accessibility has never been audited — under review
