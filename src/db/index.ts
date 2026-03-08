//import { drizzle } from "drizzle-orm/node-postgres"; // Corrected import
//import { Pool } from "pg";
//import * as schema from "./schema";
//import * as dotenv from "dotenv";

//dotenv.config({ path: ".env.local" });

//const pool = new Pool({
//  connectionString: process.env.DATABASE_URL,
//});

//export const db = drizzle(pool, { schema });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL is missing from .env.local");
}

const isCloud = connectionString.includes("neon.tech");

const pool = new Pool({
  connectionString: connectionString,
  // Force SSL for Neon, disable for local
  ssl: isCloud ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });