import { Elysia, t } from 'elysia';
import { db } from './db/db';
import { task } from './db/schema';
import { eq } from 'drizzle-orm';

const app = new Elysia()
  .group('/api', (app) =>
    app
      .get('/tasks', async () => {
        const tasks = await db.select().from(task);

        return {
          data: { tasks },
        };
      })
      .get(
        '/tasks/:id',
        async ({ params }) => {
          return db.select().from(task).where(eq(task.id, params.id));
        },
        { params: t.Object({ id: t.String() }) }
      )
      .post(
        '/tasks',
        async ({ body }) => {
          const taskCreated = await db
            .insert(task)
            .values({
              description: body.description,
              name: body.name,
            })
            .returning();

          return {
            data: { task: taskCreated },
          };
        },
        {
          body: t.Object({
            description: t.String(),
            name: t.String(),
          }),
          type: 'application/x-www-form-urlencoded',
        }
      )
      .delete(
        '/tasks/:id',
        async ({ params }) => {
          const id = params.id;
          const taskDeleted = await db
            .delete(task)
            .where(eq(task.id, id))
            .returning();

          return {
            data: { task: taskDeleted },
          };
        },
        { params: t.Object({ id: t.String() }) }
      )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
