import { pgTable, uuid, text, integer, boolean, timestamp, primaryKey, pgEnum, jsonb } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// 1. Roles Definition
export const roleEnum = pgEnum("role", ["ADMIN", "CONTRIBUTOR", "READER"]);

// 2. Auth.js Standard Tables
export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role").default("READER"), // Default Role
  requestingUpgrade: boolean("requesting_upgrade").default(false),
  isSuspended: boolean("is_suspended").default(false), // Requirement 1: User management
});

export const accounts = pgTable("account", {
  userId: uuid("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
}));

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// 3. Application Tables
export const verses = pgTable("verses", {
  id: uuid("id").primaryKey().defaultRandom(),
  verseNumber: integer("verse_number").unique().notNull(),
  title: text("title").notNull(),
  contentHtml: text("content_html").notNull(),
  isIncomplete: boolean("is_incomplete").default(false),
  paliTerms: jsonb("pali_terms"),
  slug: text("slug").unique().notNull(),
});

export const footnotes = pgTable("footnotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  verseId: uuid("verse_id").references(() => verses.id, { onDelete: "cascade" }),
  marker: text("marker"),
  content: text("content").notNull(),
});

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  verseId: uuid("verse_id").references(() => verses.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  verseId: uuid("verse_id").references(() => verses.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(), // Requirement 2: Saved date
});