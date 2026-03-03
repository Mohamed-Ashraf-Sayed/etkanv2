#!/bin/sh

# Wait for MariaDB to accept connections (safety net, docker healthcheck handles most of this)
echo "Waiting for database..."
MAX_RETRIES=15
RETRY=0
while ! nc -z db 3306 2>/dev/null; do
  RETRY=$((RETRY + 1))
  if [ $RETRY -ge $MAX_RETRIES ]; then
    echo "Database not ready after ${MAX_RETRIES} retries, starting anyway..."
    break
  fi
  echo "Database not ready, retrying ($RETRY/$MAX_RETRIES)..."
  sleep 2
done
echo "Database is ready!"

echo "Running database migrations..."
node node_modules/prisma/build/index.js db push --config prisma/prisma.config.ts 2>&1 || echo "Migration warning: could not push schema"

mkdir -p /app/data/uploads/projects
echo "Starting server..."
exec node server.js
