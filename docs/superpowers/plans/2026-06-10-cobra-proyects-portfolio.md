# Cobra-Proyects Portfolio Content Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 4 fabricated example projects in the Nuxt portfolio with ~13–16 real, anonymized case studies built from the 24 repos in `/home/hamilton/Desktop/cobra-proyects`, each with locally-captured UI screenshots.

**Architecture:** Two parallel workstreams feeding one data file. (1) Read-only **profiling agents** (one per repo) extract factual product/stack/feature summaries → aggregated into `composables/useProjects.ts`. (2) **Boot+capture agents** (one per bootable repo, isolated ports, max 3–4 concurrent) boot each app locally and capture screenshots with a shared Playwright script → `public/projects/<slug>/`. Apps that won't boot fall back to a repo asset or the existing styled placeholder. The portfolio's existing `Project` schema and image conventions are reused unchanged.

**Tech Stack:** Nuxt 3 / Vue 3 / TS / Tailwind v4 (portfolio). Targets are mostly Laravel + SQLite (a few Dockerized Vue/React/Nuxt apps). Capture via Playwright (Chromium) — authorized for this task only.

**Spec:** `docs/superpowers/specs/2026-06-10-cobra-proyects-portfolio-design.md`

**Conventions:**
- Anonymize external client brands in public copy; keep user brands **Buddy, Cobra Studio, Solid**.
- No invented metrics — only facts evidenced in a repo.
- Scratch artifacts (profiles, boot logs) live in `.work/` (git-ignored), NOT committed.
- Commit content + tooling; do not commit the cobra apps' generated `vendor/`, `.env`, or sqlite files (those live in their own dirs, never staged here).

---

## Chunk 1: Profiling & Descriptions

### Task 1: Scratch workspace + repo manifest

**Files:**
- Create: `.work/` (git-ignored scratch dir)
- Modify: `.gitignore`
- Create: `.work/manifest.json` (the canonical list of entries → repos → slugs → ports)

- [ ] **Step 1: Ignore the scratch dir**

Append to `.gitignore`:
```
# transient build/capture artifacts
.work/
```

- [ ] **Step 2: Create the manifest**

Create `.work/manifest.json` enumerating every portfolio entry, its slug, accent color, the source repo(s), whether it's a boot+capture target, and an assigned port. Use this exact starting structure (labels/flags refined by Task 2 once profiles return):

```json
{
  "entries": [
    { "slug": "buddy-assist", "repos": ["buddy-client-web-app-3","buddy-backend","buddy-sso-keycloak","buddy-docs"], "captureRepo": "buddy-client-web-app-3", "port": 8101, "brand": "Buddy", "anonymize": false },
    { "slug": "ast", "repos": ["ast-surf-resort","ast-web-2","ast-web-3"], "captureRepo": "ast-surf-resort", "port": 8102, "brand": null, "anonymize": true },
    { "slug": "solid-platform", "repos": ["solid-2026-laravel","solid-wp-stores","solid-wp-vendor-onsus"], "captureRepo": "solid-2026-laravel", "port": 8103, "brand": "Solid", "anonymize": false },
    { "slug": "dealer-intranet", "repos": ["autostar-intranet-web"], "captureRepo": "autostar-intranet-web", "port": 8104, "brand": null, "anonymize": true },
    { "slug": "barra-oliba", "repos": ["barra-oliba-web"], "captureRepo": "barra-oliba-web", "port": 8105, "brand": null, "anonymize": true },
    { "slug": "brandy", "repos": ["brandy-web"], "captureRepo": "brandy-web", "port": 8106, "brand": null, "anonymize": true },
    { "slug": "cobra-studio", "repos": ["cobrastudio-web"], "captureRepo": "cobrastudio-web", "port": 8107, "brand": "Cobra Studio", "anonymize": false },
    { "slug": "vehicle-rental", "repos": ["colon-rent"], "captureRepo": "colon-rent", "port": 8108, "brand": null, "anonymize": true },
    { "slug": "copey", "repos": ["copey-web"], "captureRepo": "copey-web", "port": 8109, "brand": null, "anonymize": true },
    { "slug": "crudo", "repos": ["crudo-web"], "captureRepo": "crudo-web", "port": 8110, "brand": null, "anonymize": true },
    { "slug": "surf-travel", "repos": ["escape-surf-travel-web"], "captureRepo": "escape-surf-travel-web", "port": 8111, "brand": null, "anonymize": true },
    { "slug": "ficus", "repos": ["ficus-web"], "captureRepo": "ficus-web", "port": 8112, "brand": null, "anonymize": true },
    { "slug": "cancer-charity", "repos": ["liga-contra-el-cancer"], "captureRepo": "liga-contra-el-cancer", "port": 8113, "brand": null, "anonymize": true },
    { "slug": "travel-agency", "repos": ["simple-travel-web"], "captureRepo": "simple-travel-web", "port": 8114, "brand": null, "anonymize": true },
    { "slug": "tsunami", "repos": ["tsunami-web"], "captureRepo": "tsunami-web", "port": 8115, "brand": null, "anonymize": true },
    { "slug": "digital-menu", "repos": ["tumenuvirtual-backend"], "captureRepo": null, "port": null, "brand": null, "anonymize": true }
  ],
  "supportingWork": ["tsm-main"]
}
```

- [ ] **Step 3: Verify**

Run: `python3 -c "import json;d=json.load(open('.work/manifest.json'));print(len(d['entries']),'entries');[print(e['slug'],e['port']) for e in d['entries']]"`
Expected: `16 entries` and 16 unique slug/port lines. Confirm ports are unique.

- [ ] **Step 4: Commit**

```bash
git add .gitignore && git commit -m "chore: ignore .work scratch dir"
```
(`.work/manifest.json` is intentionally NOT committed — it's regenerated scratch.)

---

### Task 2: Profile every repo (parallel read-only agents)

**Files:**
- Create: `.work/profiles/<repo>.json` (one per repo, scratch)

- [ ] **Step 1: Dispatch profiling agents**

Dispatch one **Explore** (read-only) agent per repo in `.work/manifest.json` (all `repos[]` across entries + `tumenuvirtual-backend`). Run in batches (≤6 concurrent). Use this exact prompt template, substituting `<REPO>`:

> Read-only. Profile the repo at `/home/hamilton/Desktop/cobra-proyects/<REPO>` for a portfolio case study. Do NOT modify anything. Inspect: README, `composer.json`/`package.json` (name + key deps), `routes/web.php` (or Nuxt `pages/`), `resources/views` or `components/`, `database/seeders`, `.env.example`, `docker-compose*`. Return ONLY a JSON object (no prose) with keys:
> `{ "repo", "realName", "productType" (e.g. "restaurant marketing site"), "stack" (string[] of real frameworks/libs, max 8), "features" (string[] of concrete user-facing features), "userRole" (best inference of what the developer built), "challenges" ([{title, body}] — only if evidenced in code/config, else []), "publicRoutes" (string[] of GET routes that render a page, no auth/api/POST, max 5, "/" first), "bootable" (bool — has artisan or a dev server + buildable frontend), "bootNotes" (env/secret/seed risks), "suggestedAnonLabel" (generic public name with no client brand) }`. No invented metrics.

Write each agent's JSON to `.work/profiles/<REPO>.json`.

- [ ] **Step 2: Verify profiles landed**

Run: `ls .work/profiles/*.json | wc -l` → expect ≥17 files.
Run: `for f in .work/profiles/*.json; do python3 -c "import json,sys;json.load(open('$f'))" || echo "BAD: $f"; done`
Expected: no `BAD:` lines (all valid JSON).

- [ ] **Step 3: Reconcile manifest**

Read every profile. For each entry, if `bootable=false` or no `publicRoutes`, set its `captureRepo` to `null` in `.work/manifest.json` and move it to `supportingWork` if it has no UI at all. Update `publicRoutes` per `captureRepo` into the manifest (add a `routes` field per entry). Re-verify entry count and note which dropped to Supporting work.

---

### Task 3: Aggregate profiles → write real Project entries

**Files:**
- Modify: `composables/useProjects.ts` (replace the `projects` array contents)

- [ ] **Step 1: Build the new `projects` array**

For each manifest entry, synthesize a `Project` object from its profile(s):
- `name`: brand if `anonymize:false`, else `suggestedAnonLabel`.
- `tagline`: one line from `productType` + primary value.
- `description`: one paragraph, factual, anonymized, no invented metrics.
- `year`: derive from the source repo's git history. Run `git -C /home/hamilton/Desktop/cobra-proyects/<REPO> log -1 --format=%cd --date=format:%Y` for the latest year and `git -C <REPO> log --reverse --format=%cd --date=format:%Y | head -1` for the first; format as `"2024 — 2025"` (or single year if equal). If the repo has no git, use `"—"`.
- `role`: from `userRole` (default "Frontend Engineer" / "Full-stack Engineer" for grouped).
- `isPrivate`: `true` unless a known public URL exists; omit `link` when private.
- `stack`: real deps from profile (max ~8 chips).
- `responsibilities`: 3–5 from `features`/`userRole`.
- `architecture`: 3–4 factual lines (grouped entries describe the family: app + API + SSO).
- `challenges`: from profile (only evidenced ones); if empty, write 1 honest one or omit.
- `screenshots`: placeholder entries now — `{ src: "01-home.png", alt: "<name> home" }` plus one per planned route. Real files arrive in Chunk 2.
- `accent`: assign by rotating hue so no two adjacent cards collide. Use `hsl(H, 70%, 65%)` converted to hex, with `H = (entryIndex * 360 / entryCount)` rounded — i.e. evenly spaced hues across all entries. (Existing examples used soft pastels like `#7dd3fc`, `#a78bfa`, `#c5ff3a`, `#fb923c` — match that lightness/saturation.)

Replace the entire `projects: Project[] = [ ... ]` body. Keep the `Project` type and `useProjects` export unchanged.

- [ ] **Step 2: Type-check / build**

Run: `cd /home/hamilton/portfolio && npx nuxi typecheck 2>/dev/null || npm run build`
Expected: build succeeds (no TS errors in `useProjects.ts`).

- [ ] **Step 3: Smoke-render**

Run: `npm run build && npm run preview &` then `curl -s localhost:3000 | grep -o '<title>[^<]*' | head -1` and `curl -s localhost:3000/work/buddy-assist | grep -ci "buddy"`. Kill preview after.
Expected: home returns 200 with content; `/work/<slug>` pages render entry copy. Placeholders show for missing images (no crash).

- [ ] **Step 4: Commit**

```bash
git add composables/useProjects.ts && git commit -m "content: replace example projects with real anonymized cobra-proyects case studies"
```

---

## Chunk 2: Screenshot Capture

### Task 4: Shared capture tooling (prove on ONE repo first)

**Files:**
- Create: `tools/capture.mjs` (Playwright screenshot script)
- Create: `tools/boot-laravel.sh` (generic Laravel+SQLite boot helper)
- Modify: `package.json` (add `playwright` devDependency)

- [ ] **Step 1: Install Playwright + Chromium**

Run: `cd /home/hamilton/portfolio && npm i -D playwright && npx playwright install chromium`
Expected: chromium downloaded, exit 0.

- [ ] **Step 2: Write the capture script**

Create `tools/capture.mjs`:
```js
// Usage: node tools/capture.mjs <baseUrl> <outDir> <slug> [route ...]
// Captures full-page desktop (1440x900) per route + one mobile (390x844) home shot.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const [, , baseUrl, outDir, slug, ...routes] = process.argv;
if (!baseUrl || !outDir) { console.error('need baseUrl + outDir'); process.exit(2); }
const paths = routes.length ? routes : ['/'];
const slug2 = (r) => (r === '/' ? 'home' : r.replace(/^\//, '').replace(/\//g, '-') || 'home');

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const shoot = async (route, file, mobile = false) => {
  const ctx = await browser.newContext(
    mobile
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true }
      : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 }
  );
  const page = await ctx.newPage();
  try {
    // 'load' (not 'networkidle') — SPA/Inertia apps with polling/websockets
    // never reach networkidle and would burn the full timeout every route.
    await page.goto(baseUrl + route, { waitUntil: 'load', timeout: 30000 });
  } catch { /* settle anyway */ }
  // trigger lazy-loaded content, then return to top for the hero shot
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 600); y += 600;
        if (y >= document.body.scrollHeight) { clearInterval(t); r(); }
      }, 100);
    });
    window.scrollTo(0, 0);
  }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.screenshot({ path: file, fullPage: true });
  await ctx.close();
  console.log('captured', file);
};
try {
  let i = 1;
  for (const r of paths) {
    await shoot(r, `${outDir}/${String(i).padStart(2, '0')}-${slug2(r)}.png`);
    i++;
  }
  await shoot(paths[0], `${outDir}/${String(i).padStart(2, '0')}-mobile.png`, true);
} finally {
  await browser.close();
}
```

- [ ] **Step 3: Write the Laravel boot helper**

Create `tools/boot-laravel.sh`:
```bash
#!/usr/bin/env bash
# Usage: tools/boot-laravel.sh <repo_dir> <port>
# Boots a Laravel+SQLite app for screenshotting. Best-effort; non-fatal on seed errors.
set -uo pipefail
REPO="$1"; PORT="$2"
cd "$REPO" || exit 3
[ -d vendor ] || composer install --no-interaction --prefer-dist || exit 4
[ -f .env ] || cp .env.example .env
grep -q '^APP_KEY=base64' .env || php artisan key:generate --force
# force sqlite
if grep -q '^DB_CONNECTION=' .env; then
  sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=sqlite/' .env
else
  echo 'DB_CONNECTION=sqlite' >> .env
fi
sed -i '/^DB_HOST=/d;/^DB_PORT=/d;/^DB_DATABASE=/d;/^DB_USERNAME=/d;/^DB_PASSWORD=/d' .env
mkdir -p database && touch database/database.sqlite
php artisan migrate --seed --force || php artisan migrate --force || true
php artisan storage:link 2>/dev/null || true
if [ -f package.json ]; then npm install --no-audit --no-fund || true; npm run build || true; fi
exec php artisan serve --port="$PORT" --no-reload
```
Run: `chmod +x tools/boot-laravel.sh`

- [ ] **Step 4: Prove the pipeline end-to-end on ONE repo**

Pick a simple bootable entry (e.g. `barra-oliba` / `barra-oliba-web`, port 8105). In a background shell: `tools/boot-laravel.sh /home/hamilton/Desktop/cobra-proyects/barra-oliba-web 8105`. Wait for "Server running". Then:
Run: `node tools/capture.mjs http://localhost:8105 public/projects/barra-oliba barra-oliba / <route2>`
Expected: PNG files appear in `public/projects/barra-oliba/`, each > 10 KB. Then kill the boot process.

Run: `ls -la public/projects/barra-oliba/ && find public/projects/barra-oliba -name '*.png' -size +10k | wc -l`
Expected: ≥2 non-trivial PNGs.

- [ ] **Step 5: Commit tooling**

```bash
git add tools/capture.mjs tools/boot-laravel.sh package.json package-lock.json && git commit -m "tools: Playwright capture + Laravel boot helper for portfolio screenshots"
```

---

### Task 5: Boot + capture all bootable repos (parallel agents, batches of 3–4)

**Files:**
- Create/populate: `public/projects/<slug>/*.png`
- Create: `.work/capture-report.json` (scratch — per-repo success/failure)

- [ ] **Step 1: Dispatch boot+capture agents**

For each manifest entry with a non-null `captureRepo`, dispatch a worker agent (max 3–4 concurrent). Use this prompt template, substituting `<REPO>`, `<PORT>`, `<SLUG>`, `<ROUTES>` (from the entry's `routes`):

> Task: boot the app at `/home/hamilton/Desktop/cobra-proyects/<REPO>` and capture screenshots into `/home/hamilton/portfolio/public/projects/<SLUG>/`. Steps:
> 1. **Determine app type by what's in the repo, not by name.** If the repo has an `artisan` file it is a **Laravel app** (even if its frontend is React/Vue/Inertia via Vite — `colon-rent`, `crudo-web`, `ficus-web` are ALL Laravel): boot it with `/home/hamilton/portfolio/tools/boot-laravel.sh /home/hamilton/Desktop/cobra-proyects/<REPO> <PORT>` in the background (the helper already runs `npm run build` for assets). ONLY `buddy-client-web-app-3` is a genuine standalone Nuxt app with no `artisan` — boot it with `npm install && npm run build && npm run preview -- --port <PORT>` (fall back to `npm run dev -- --port <PORT>`). Do NOT use the Docker branch — bare boot on the assigned `<PORT>` is more predictable and avoids port collisions.
> 2. Poll `curl -sf http://localhost:<PORT>` until it responds (timeout 180s). Read `routes/web.php` (or pages) and pick up to 4 page-rendering GET routes if `<ROUTES>` is empty.
> 3. Run `node /home/hamilton/portfolio/tools/capture.mjs http://localhost:<PORT> /home/hamilton/portfolio/public/projects/<SLUG> <SLUG> <ROUTES>`.
> 4. **Judge content quality:** open the captured home PNG conceptually — if the page rendered but is essentially empty (seeders failed, no products/testimonials/categories loaded), treat it as a SOFT FAILURE: set `"booted": false` with `failureReason: "rendered empty (seed failure)"` so Task 5 Step 3 supplies a fallback asset instead of shipping a blank screenshot.
> 5. Tear down: `pkill -f "artisan serve --port=<PORT>"` (and any `vite`/`nuxt` preview you started on `<PORT>`). NEVER run `git add`/`git commit` inside `<REPO>`.
> 6. Return ONLY JSON: `{ "slug":"<SLUG>", "repo":"<REPO>", "booted":bool, "images":[filenames], "failureReason":"" }`.
> Do not modify the portfolio repo except writing PNGs under `public/projects/<SLUG>/`. Do not commit.

> **Known hard cases (set expectations, don't over-invest):** `buddy-client-web-app-3` is a Nuxt client that reads an `apiBase` from `runtimeConfig` and needs `buddy-backend` (+ Keycloak) running to render real data — it will likely render an empty/login shell. Capture whatever the public landing renders; if it's a bare login/empty shell, mark soft failure and let it fall to a fallback asset. Do NOT attempt to stand up the full Buddy backend+SSO stack for one screenshot.

Collect every agent's JSON into `.work/capture-report.json`.

- [ ] **Step 2: Verify captures**

Run: `for d in public/projects/*/; do n=$(find "$d" -name '*.png' -size +10k | wc -l); echo "$n  $d"; done`
Expected: each booted slug has ≥1 PNG > 10 KB. Note slugs with 0 (failures).

- [ ] **Step 3: Fallback for non-booting repos**

For each entry in `.work/capture-report.json` with `booted:false`: dispatch (or do inline) a fallback — copy ONE representative hero/banner image from the source repo's `public/`/`assets/` into `public/projects/<slug>/01-home.png` (resize/convert with `magick`/`cwebp` if available). If no suitable asset, leave it — the UI placeholder covers it. Record the choice in the report.

---

### Task 6: Reconcile screenshot filenames + final verification

**Files:**
- Modify: `composables/useProjects.ts` (real screenshot filenames + alts/captions)
- Create: `docs/superpowers/plans/2026-06-10-capture-report.md` (committed human-readable summary)

- [ ] **Step 1: Sync `screenshots[]` to actual files**

For each entry, set `screenshots[]` to the real PNG filenames now in `public/projects/<slug>/` with descriptive `alt` (and optional `caption`). Drop placeholder entries that have no file (UI still placeholders those gracefully, but the array should reflect reality).

- [ ] **Step 2: Build + render check**

Run: `cd /home/hamilton/portfolio && npm run build`
Expected: build succeeds.
Run: `npm run preview &` then `for s in $(python3 -c "import json;[print(e['slug']) for e in json.load(open('.work/manifest.json'))['entries']]"); do code=$(curl -s -o /dev/null -w '%{http_code}' localhost:3000/work/$s); echo "$code /work/$s"; done` then kill preview.
Expected: every `/work/<slug>` returns `200`.

- [ ] **Step 3: Write the committed capture report**

Summarize from `.work/capture-report.json` into `docs/superpowers/plans/2026-06-10-capture-report.md`: table of slug → booted? → #images → failure reason / fallback used. This is the deliverable record of what worked.

- [ ] **Step 4: Commit**

```bash
git add public/projects composables/useProjects.ts docs/superpowers/plans/2026-06-10-capture-report.md
git commit -m "content: real screenshots for cobra-proyects case studies + capture report"
```

- [ ] **Step 5: Handoff to hosting**

Confirm with the user, then start a NEW brainstorming/spec cycle for Workstream D (Hosting) — it is intentionally out of scope for this plan.

---

## Notes for the executor

- **Idempotency:** re-running a boot agent must reuse existing `vendor/`/`node_modules`. Never delete a cobra repo's files; only read + boot.
- **Cleanup:** always tear down servers so ports free up for the next batch — `pkill -f "artisan serve --port=<PORT>"` and kill any nuxt/vite preview you started. If an agent dies mid-capture, the next batch's port may be held; a dispatcher-level `pkill -f "serve --port=81"` between batches is cheap insurance. (Docker branch removed — bare boot only.)
- **Safety:** the cobra repos are separate git repos — do not stage or commit anything inside them. Only the portfolio repo is committed here.
- **If >40% of repos fail to boot**, stop and surface to the user rather than mass-faking screenshots.
