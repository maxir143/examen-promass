import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2"
import * as schema from "./schema"

export const connection = mysql.createConnection({
  host: import.meta.env.DB_HOST,
  user: import.meta.env.DB_USERNAME,
  password: import.meta.env.DB_PASSWORD,
  database: import.meta.env.DB_NAME,
  keepAliveInitialDelay: 10000,
})

export const db = drizzle(connection, {
  schema,
  mode: "default",
})
