#!/bin/sh
echo "Running database migrations..."
node node_modules/prisma/build/index.js migrate deploy --config prisma/prisma.config.ts || echo "Migration warning: could not run migrations"
echo "Starting server..."
exec node server.js
