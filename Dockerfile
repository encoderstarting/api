FROM node:22-alpine AS frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN VITE_API_BASE_URL=/api npm run build

FROM php:8.4-cli

RUN apt-get update \
    && apt-get install -y --no-install-recommends git libonig-dev libsqlite3-dev libxml2-dev sqlite3 unzip \
    && docker-php-ext-install mbstring pdo_sqlite xml \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

COPY --from=frontend /frontend/dist /app/public

RUN composer install --no-dev --no-interaction --optimize-autoloader \
    && chmod -R 775 storage bootstrap/cache

CMD ["sh", "-c", "mkdir -p /data && touch /data/database.sqlite && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-80}"]
