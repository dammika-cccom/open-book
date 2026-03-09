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

const connectionString = process.env.DATABASE_URL!;

// The neon client handles the connection via HTTP, which is very light for the Edge
const client = neon(connectionString);

export const db = drizzle(client, { schema });