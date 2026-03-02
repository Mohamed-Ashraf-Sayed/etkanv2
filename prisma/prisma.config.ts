import path from "node:path";
import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const dbUrl = process.env.DATABASE_URL || "mysql://placeholder:placeholder@localhost:3306/placeholder";

export default defineConfig({
  schema: path.join(__dirname, "schema.prisma"),
  migrations: { path: path.join(__dirname, "migrations") },
  datasource: {
    url: dbUrl,
  },
});
