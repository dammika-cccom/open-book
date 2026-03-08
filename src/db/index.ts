//import { drizzle } from "drizzle-orm/node-postgres"; // Corrected import
//import { Pool } from "pg";
//import * as schema from "./schema";
//import * as dotenv from "dotenv";

//dotenv.config({ path: ".env.local" });

//const pool = new Pool({
//  connectionString: process.env.DATABASE_URL,
//});

//export const db = drizzle(pool, { schema });

import { drizzle } from "drizzle-orm/neon-http"; // We changed this to neon-http
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ DATABASE_URL is missing from environment variables");
}

// Create the connection client using HTTP
// This works perfectly on Cloudflare Edge without extra WebSocket config
const client = neon(connectionString);

// Initialize drizzle with the HTTP client
export const db = drizzle(client, { schema });