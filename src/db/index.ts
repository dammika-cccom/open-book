//import { drizzle } from "drizzle-orm/node-postgres"; // Corrected import
//import { Pool } from "pg";
//import * as schema from "./schema";
//import * as dotenv from "dotenv";

//dotenv.config({ path: ".env.local" });

//const pool = new Pool({
//  connectionString: process.env.DATABASE_URL,
//});

//export const db = drizzle(pool, { schema });



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