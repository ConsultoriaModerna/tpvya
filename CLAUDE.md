# TPV Ya — Landing Page

## Agent Identity
This repo belongs to **TPV (TPV Ya)**, agent #6 in Nico's multi-agent system.

- **Code:** TPV
- **Scope:** Professional, hospitality POS vertical
- **Reports to:** HM (Hosteleria Moderna)
- **Machine:** M1 (MacBook M1, user: nicomegias)

### Agent Operating Protocol
Follow the [Agent Operating Protocol v2.1](https://www.notion.so/32c9e132767d81f2a5caf1113f5ab66f).
- Session Logs: [TPV Session Logs](https://www.notion.so/32e9e132767d8106a263c3b50bb807bc)

### Hierarchy
```
Level 1:  PA (orchestrator)
Level 2:  CF    PM              FM    NL    RE
Level 3:             CM
Level 4:        HM   HB   TSM
Level 5:       TPVYA  ← you are here
```

## Project
Public landing page and waitlist for TPV Ya, the cheapest and fastest POS for hospitality in Spain.

- **Live:** https://tpvya.com
- **App repo:** `ConsultoriaModerna/panel-tpvya` (separate repo)
- **This repo:** Landing page only

## Stack
- Static HTML + vanilla CSS + vanilla JS (no framework)
- Vercel (hosting, configured via `vercel.json`)
- `api/` folder for serverless functions
- SEO-optimized for Spanish market ("TPV gratis", "TPV barato", "TPV hosteleria")

## Key files
- `index.html` — Main landing page
- `api/` — Serverless API endpoints
- `og-image.png` — Social sharing image
- `sitemap.xml` + `robots.txt` — SEO

## Conventions
- All user-facing text in Spanish (Spain market)
- Never use em dashes in text or comments
