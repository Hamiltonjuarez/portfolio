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
