import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }), name: text("name").notNull(), phone: text("phone").notNull(), email: text("email").notNull().default(""), interest: text("interest").notNull().default(""), source: text("source").notNull().default("website"), status: text("status").notNull().default("new"), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_leads_status_created").on(table.status, table.createdAt)]);

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }), name: text("name").notNull(), phone: text("phone").notNull(), email: text("email").notNull().default(""), course: text("course").notNull(), preferredDate: text("preferred_date").notNull(), preferredTime: text("preferred_time").notNull(), notes: text("notes").notNull().default(""), status: text("status").notNull().default("requested"), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_bookings_date_status").on(table.preferredDate, table.status)]);

export const knowledgeSources = sqliteTable("knowledge_sources", {
  id: integer("id").primaryKey({ autoIncrement: true }), filename: text("filename").notNull(), storageKey: text("storage_key").notNull().unique(), contentType: text("content_type").notNull(), size: integer("size").notNull(), status: text("status").notNull().default("uploaded"), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
