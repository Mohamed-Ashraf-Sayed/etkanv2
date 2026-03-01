#!/bin/sh
echo "Running database migrations..."
npx prisma migrate deploy --config prisma/prisma.config.ts || echo "Migration warning: could not run migrations"
echo "Starting server..."
exec node server.js
