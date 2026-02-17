# Theatrico Site Review — 2026-02-17

## Snapshot
- URL: https://theatrico.org/
- Hosting: **S3 + CloudFront** (headers show `server: AmazonS3`, `via: CloudFront`).
- SPA shell: HTML is minimal and loads JS/CSS bundles from `/assets/*`.
- Monitoring: **AWS RUM** is embedded (good) with `sessionSampleRate: 1` (100% sampling).

## Highest-leverage improvements
### 1) Add full OG/Twitter metadata
Current HTML includes:
- `og:title`, `og:description`, `og:type`

Missing (recommended):
- `og:image` (critical for share cards)
- `og:url`
- `twitter:card` (usually `summary_large_image`)
- `twitter:image`

### 2) Add canonical URL
Add:
- `<link rel="canonical" href="https://theatrico.org/" />`

### 3) Add basic structured data
Add JSON-LD for `Organization` (or `LocalBusiness` if appropriate):
- name, url, logo, sameAs (Instagram), areaServed.

### 4) SPA resilience / perceived load
Because the HTML is essentially a root div + JS:
- Ensure there’s a small **noscript** message.
- Consider a tiny inline “loading” skeleton so slow connections don’t look broken.

### 5) AWS RUM sampling
RUM is set to `sessionSampleRate: 1`.
- If traffic grows, reduce to e.g. `0.1` to control cost.

## Notes
- Site visually looks strong (hero + clear nav + CTAs). From the screenshot: primary CTAs are present (“Start a project”, “Follow along”).
- Next review step (if you want): run Lighthouse (mobile) and list concrete perf/a11y fixes.
