#!/bin/sh
echo "Running database migrations..."
node node_modules/prisma/build/index.js db push --config prisma/prisma.config.ts --skip-generate 2>&1 || echo "Migration warning: could not push schema"
mkdir -p /app/data/uploads/projects
echo "Starting server..."
exec node server.js
