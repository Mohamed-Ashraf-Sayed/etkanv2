#!/bin/sh
npx prisma migrate deploy --config prisma/prisma.config.ts 2>/dev/null || true
exec node server.js
