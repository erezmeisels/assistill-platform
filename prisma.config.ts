import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    // Prisma CLI (migrate dev, db push, introspect) uses this direct connection.
    // In Prisma 7, directUrl is removed — this url IS the direct url for CLI commands.
    // Your app runtime should use DATABASE_URL (the pooled connection) via your driver/client setup.
    url: process.env.DIRECT_URL,
  },
});
