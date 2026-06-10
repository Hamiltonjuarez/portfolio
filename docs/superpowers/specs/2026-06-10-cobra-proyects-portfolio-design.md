# Cobra-Proyects → Portfolio: Real Case Studies, Screenshots & Hosting

**Date:** 2026-06-10
**Status:** Approved design (brainstorming complete)
**Repo:** `/home/hamilton/portfolio` (Nuxt 3 + Vue 3 + TS + Tailwind v4)

## Goal

Replace the 4 fabricated example projects in the portfolio with the user's
real work from `/home/hamilton/Desktop/cobra-proyects` (25 repos). Each
portfolio entry gets a factual (anonymized) description and locally-captured
UI screenshots. After content lands, stand up hosting infrastructure.

## Non-Goals (YAGNI)

- No redesign of the portfolio's visual system, components, or routes. The
  existing `Project` schema in `composables/useProjects.ts` and the
  `public/projects/<slug>/` image convention are reused unchanged.
- No new CMS. Project data stays as a typed array in `useProjects.ts`.
- No production deploys of the cobra apps themselves — they are booted
  locally only to capture screenshots, then torn down.
- No invented metrics. If a fact (e.g. a perf number) is not evidenced in
  the repo, it is not claimed.

## Constraints

- **Anonymized client names.** External client brands are genericized in
  public copy (e.g. "Liga Contra el Cáncer" → "cancer-charity donation
  site"). The user's own brands — **Buddy, Cobra Studio, Solid** — are kept.
  Final copy is reviewed by the user before publish.
- **Playwright authorized for this task only** (explicit user OK, this
  session) for booting + capturing app screenshots. Not standing
  authorization for future sessions.
- Screenshots captured at 1440×900 desktop + a 390×844 mobile shot where
  the app is responsive. Stored as PNG (or WebP) in
  `public/projects/<slug>/`.

## Scope: Portfolio Entry List (~16 entries)

### Grouped case studies (product/client families)

1. **Buddy Assist** (`slug: buddy-assist`) — full-stack product.
   Repos: `buddy-client-web-app-3` (Nuxt client app, pkg `buddy-assist-web`),
   `buddy-backend` (Laravel API), `buddy-sso-keycloak` (Keycloak SSO),
   `buddy-docs`. Brand kept ("Buddy").
2. **AST** (`slug: ast`) — iterations of one hospitality/surf-resort client
   site. Repos: `ast-surf-resort`, `ast-web-2`, `ast-web-3` (share
   `solid/ast-web2` composer name). Anonymized public label.
3. **Solid Platform** (`slug: solid-platform`) — agency platform + WP store
   toolkit (internal). Repos: `solid-2026-laravel`, `solid-wp-stores`,
   `solid-wp-vendor-onsus`. Brand kept ("Solid").

### Individual case studies (visual web apps)

Each its own `/work/<slug>` entry; public label anonymized, factual
description derived from the repo:

| Repo | Proposed slug | Anonymized angle (agent verifies) |
|------|---------------|-----------------------------------|
| `autostar-intranet-web` | `dealer-intranet` | automotive-dealer intranet |
| `barra-oliba-web` | `barra-oliba` | hospitality / bar-restaurant site |
| `brandy-web` | `brandy` | brand/marketing site |
| `cobrastudio-web` | `cobra-studio` | studio site (brand kept) |
| `colon-rent` | `vehicle-rental` | vehicle-rental platform (React starter) |
| `copey-web` | `copey` | brand / product site |
| `crudo-web` | `crudo` | restaurant site (React) |
| `escape-surf-travel-web` | `surf-travel` | surf-travel booking/appointments |
| `ficus-web` | `ficus` | React app (Laravel react-starter) |
| `liga-contra-el-cancer` | `cancer-charity` | charity donation site |
| `simple-travel-web` | `travel-agency` | travel-agency booking site |
| `tsunami-web` | `tsunami` | brand / e-commerce site |
| `tumenuvirtual-backend` | `digital-menu` | digital-menu SaaS (backend) |

### Folded into a compact "Supporting work" list (no standalone page)

- `tsm-main` (WordPress/static — no bootable Laravel app).
- Pure-backend / infra repos already represented inside their family
  (`buddy-backend`, `buddy-sso-keycloak`, `solid-wp-*`).

> Final slugs/labels may be adjusted once per-repo agents report the true
> nature of ambiguous repos (`brandy`, `copey`, `ficus`, `tsunami`). Any
> repo that turns out to have no meaningful UI drops to "Supporting work".

## Data Model

No schema change. Each entry is a `Project` object in
`composables/useProjects.ts` using existing fields: `slug, name, tagline,
description, year, role, isPrivate, link?, stack, responsibilities,
architecture, challenges[], screenshots[], accent`. Grouped entries describe
the family in `architecture`/`responsibilities` and may carry screenshots
from multiple sub-apps.

## Workstream B — Descriptions (anonymized, factual)

**Unit:** one read-only profiling agent per repo. Input: repo path. Output
(structured): real product purpose, stack (from composer.json/package.json +
key deps), notable routes/features, the user's likely responsibilities, 1–2
defensible "challenges", and a suggested anonymized public label. The agent
reads README, composer/package manifests, `routes/`, `resources/`,
`pages/`/`components/` — it does NOT invent metrics.

Aggregation: main session merges agent outputs into `Project` entries,
applying anonymization rules and grouping families. User reviews all copy
before publish.

## Workstream C — Screenshots (boot locally + capture)

**Unit:** one boot+capture agent per bootable repo, isolated, on a unique
port (base 8100 + index). Pipeline for a Laravel+SQLite app:

1. `composer install` (skip if `vendor/` present)
2. `cp .env.example .env` → `php artisan key:generate`
3. SQLite: `touch database/database.sqlite`, set `DB_CONNECTION=sqlite`
4. `php artisan migrate --seed` (tolerate seed failures; continue)
5. `npm install && npm run build` (or `npm run dev`)
6. `php artisan serve --port=<port>`
7. Playwright: navigate to home + 2–4 key routes, capture
   desktop (1440×900) + one mobile shot; save to
   `public/projects/<slug>/NN-<route>.png`
8. Tear down server; report success/failure + captured filenames.

Docker repos (`barra-oliba`, `buddy-*`, `colon-rent`, `crudo`, `ficus`,
`simple-travel`) may use their compose file instead of the bare pipeline.

**Failure handling (expected ~20–40% of repos):**
- Boot fails (missing API secrets, build break, seed hard-fail) → fallback:
  pull one representative asset from the repo's `public/`/`assets/`, OR leave
  the existing styled placeholder. The portfolio already renders a safe
  placeholder for missing images, so the site stays shippable.
- Each agent reports its failure reason so the user can decide whether to
  provide a manual screenshot.

**Port/concurrency:** agents run in parallel but each binds a distinct port
and works only inside its own repo dir (no shared state). Cap concurrency to
avoid resource exhaustion.

## Execution Order

Per user: **descriptions + screenshot boot-pass in one parallel sweep**,
then hosting. Concretely:

1. Wire the ~16 `Project` entries with real anonymized copy + placeholders
   (portfolio is shippable at this point).
2. Run the boot+capture sweep; drop captured images, record failures.
3. User reviews copy + images.
4. Hosting (Workstream D).

## Workstream D — Hosting (deferred; options, not yet decided)

Decide at step 4 based on: SSR vs static, custom domain location, cost.
Candidate options to present then:

- **Vercel** or **Netlify** — first-class Nuxt 3 (SSR or static) deploy from
  Git; simplest. Recommended default unless self-hosting is required.
- **Cloudflare Pages** — static/edge; cheap, fast, good if no Node SSR.
- **VPS (e.g. the user's existing infra)** — full control; more setup
  (Node process manager / Nginx / CI). Fits if everything must be
  self-hosted.

Hosting decision + setup is a separate spec/plan once content is in.

## Risks & Mitigations

- **Apps won't boot** → placeholder fallback keeps site shippable; per-repo
  failure reports let the user backfill manually.
- **Confidentiality** → anonymization rule + mandatory user copy review
  before publish.
- **Port/resource contention** → unique ports + concurrency cap.
- **Stale `vendor/`/`node_modules`** → reuse if present, reinstall on error.

## Success Criteria

- `composables/useProjects.ts` contains ~16 factual, anonymized entries
  (3 grouped families + ~13 individual), replacing all fabricated examples.
- Each entry that booted has ≥1 real screenshot in `public/projects/<slug>/`;
  non-booting entries have a documented fallback.
- `npm run build` succeeds; home grid + each `/work/<slug>` page render.
- A failure report lists which repos didn't boot and why.
- Hosting decision captured in a follow-up spec.
