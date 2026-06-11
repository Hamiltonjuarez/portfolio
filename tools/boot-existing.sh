#!/usr/bin/env bash
# Usage: tools/boot-existing.sh <repo_dir> <port>
# Boots a Laravel app using its EXISTING db config (cached config / original .env,
# typically MySQL via the local socket). Does NOT force SQLite. Best-effort.
set -uo pipefail
REPO="$1"; PORT="$2"
cd "$REPO" || exit 3
[ -d vendor ] || composer install --no-interaction --prefer-dist || exit 4
[ -f .env ] || cp .env.example .env
grep -q '^APP_KEY=base64' .env || php artisan key:generate --force || true
php artisan storage:link 2>/dev/null || true
# build frontend assets only if not already built
if [ -f package.json ] && [ ! -d public/build ] && [ ! -d public/js ] && [ ! -f public/mix-manifest.json ]; then
  npm install --no-audit --no-fund || true
  npm run build || npm run production || npm run prod || true
fi
exec php artisan serve --port="$PORT" --no-reload
