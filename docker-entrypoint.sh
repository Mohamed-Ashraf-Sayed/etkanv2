#!/bin/sh
echo "Running database migrations..."
node -e "
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const dbPath = path.resolve(process.env.DATABASE_URL ? process.env.DATABASE_URL.replace('file:', '') : './data/db.sqlite');
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
const db = new Database(dbPath);
const tables = db.prepare(\"SELECT name FROM sqlite_master WHERE type='table'\").all().map(function(t) { return t.name; });
if (tables.indexOf('Booking') === -1) {
  var sql = fs.readFileSync('./prisma/migrations/20260301220816_init/migration.sql', 'utf8');
  db.exec(sql);
  console.log('Migration applied successfully');
} else {
  console.log('Tables already exist, skipping migration');
}
db.close();
" || echo "Migration warning: could not run migrations"
echo "Starting server..."
exec node server.js
