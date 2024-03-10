import {
  int,
  mysqlTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core"

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 100 }).notNull(),
  content: varchar("content", { length: 100000 }).notNull(),
  authorId: int("author_id").references(() => users.id),
  date: timestamp("date").notNull(),
})

export const users = mysqlTable("users", {
  id: serial("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 100 }).notNull(),
})
