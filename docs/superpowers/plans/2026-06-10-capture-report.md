# Cobra-Proyects Portfolio — Screenshot Capture Report

Generated during execution of `2026-06-10-cobra-proyects-portfolio.md` (Chunk 2).

## Summary

| Metric | Value |
| --- | --- |
| Portfolio entries | 16 |
| Live-captured (real rendered pages) | 11 |
| Fallback asset (repo hero/banner) | 5 |
| Fallback rate | 31% (under the 40% stop threshold) |
| Total image weight | ~16 MB (optimized from ~253 MB) |

## Environment constraints encountered

- **`pdo_sqlite` not installed** (only `pdo_mysql`), and no passwordless sudo to add it. The plan's "force SQLite" boot helper (`tools/boot-laravel.sh`) therefore could not seed/serve. A second helper, **`tools/boot-existing.sh`**, was added to boot each app against its **existing MySQL config** (the local MySQL is reachable via unix socket / TCP 3307). This unblocked most apps.
- **PHP 8.4 requirement:** `solid-2026-laravel` and `ficus-web` pin PHP ≥ 8.4 (composer platform check); only PHP 8.3.15 is installed → hard fail → fallback.
- **Image optimization:** screenshots were downscaled to 1440px-wide JPEG (q82). ImageMagick's policy caps image height at 16,000px, so a few very tall full-page shots (notably `copey/01-home` and several `*-mobile`) failed and were re-captured as bounded viewport shots or dropped (desktop shots retained).

## Per-entry results

| Slug | Source repo | Booted | Method | Images | Notes |
| --- | --- | --- | --- | --- | --- |
| barra-oliba | barra-oliba-web | ✅ | MySQL | 6 | full set |
| ast | ast-surf-resort | ✅ | MySQL (cached cfg) | 6 | full set |
| brandy | brandy-web | ✅ | MySQL (cached cfg) | 6 | full set |
| copey | copey-web | ✅ | MySQL | 6 | home re-captured as viewport hero |
| cancer-charity | liga-contra-el-cancer | ✅ | MySQL (`lcc_db`) | 5 | mobile dropped in optimization |
| crudo | crudo-web | ✅ | MySQL (`crudo_db`) | 5 | mobile dropped in optimization |
| surf-travel | escape-surf-travel-web | ✅ | MySQL | 4 | full set |
| travel-agency | simple-travel-web | ✅ | MySQL | 4 | mobile dropped in optimization |
| tsunami | tsunami-web | ✅ | MySQL (:3307) | 4 | full set |
| vehicle-rental | colon-rent | ✅ | MySQL (`colon_rent_db`:3307) | 4 | full set |
| dealer-intranet | autostar-intranet-web | ✅ | MySQL | 2 | auth-gated → styled login + mobile |
| solid-platform | solid-2026-laravel | ❌ | fallback | 1 | needs PHP ≥ 8.4; no vendor. Hero: `public/assets/bgs/1.jpg` |
| ficus | ficus-web | ❌ | fallback | 1 | needs PHP ≥ 8.4. Hero: `public/assets/ficus-assets/about_us.png` |
| cobra-studio | cobrastudio-web | ❌ | fallback | 1 | .env clobbered to sqlite; MySQL :3307 rejects root, `cobra_db` creds unknown. Hero: `public/assets/img/home.jpg` |
| buddy-assist | buddy-client-web-app-3 | ❌ | fallback | 1 | Nuxt client needs backend + Keycloak (out of scope). Hero: `public/img/banners/01.jpg` |
| digital-menu | tumenuvirtual-backend | ❌ | fallback | 1 | data-only entry; vendor-scoped routes. Hero: `public/assets/images/banner_01.png` |

## How to recover the 5 fallback entries later

- **solid-platform / ficus:** install PHP 8.4 (`composer install` then `tools/boot-existing.sh <repo> <port>`), or run `composer install --ignore-platform-reqs` and serve under 8.3 if the app tolerates it.
- **cobra-studio:** obtain the `cobra_db` MySQL credentials (or seed a fresh DB) and restore the repo `.env` `DB_*` lines, then `tools/boot-existing.sh`.
- **buddy-assist:** stand up `buddy-backend` + `buddy-sso-keycloak` and point the client's `apiBase` at it.
- **digital-menu:** seed a demo vendor and capture a `/{vendor}` menu route instead of `/`.

Re-run capture with: `node tools/capture.mjs http://localhost:<port> public/projects/<slug> <slug> <routes...>` then optimize to 1440px JPEG.
