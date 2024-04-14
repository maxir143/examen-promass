import { column, NOW, defineDb, defineTable } from "astro:db"

const Posts = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    content: column.text(),
    authorId: column.number({
      references: () => Users.columns.id,
      null: false,
    }),
    date: column.date({ default: NOW }),
  },
})

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    password: column.text(),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: { Posts, Users },
})
