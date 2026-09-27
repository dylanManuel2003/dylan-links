import { pgTable, serial, varchar, timestamp, index } from "drizzle-orm/pg-core";

export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    type: varchar("type", { length: 16 }).notNull(), // 'view' | 'click'
    link: varchar("link", { length: 64 }),
    referrer: varchar("referrer", { length: 512 }),
    country: varchar("country", { length: 8 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("events_type_idx").on(t.type),
    index("events_created_at_idx").on(t.createdAt),
  ],
);

export type EventRow = typeof events.$inferSelect;
