import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const task = sqliteTable('task', {
  id: text('id')
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: text('name').notNull(),
  description: text('description').notNull(),
  isDone: integer('is_done').notNull().default(0),
});
