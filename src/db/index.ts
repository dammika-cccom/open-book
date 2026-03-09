import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

/**
 * PRODUCTION-GRADE DB INDEX
 * Strictly uses neon-http to fit within the 3MB Cloudflare limit.
 */

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing from environment variables");
}

const client = neon(process.env.DATABASE_URL);

export const db = drizzle(client, { schema });