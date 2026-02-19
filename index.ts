import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import db from './db';

const app = new Elysia()
  .use(cors())

  // PROJECTS
  .group('/projects', app =>
    app
      .get('/', () => {
        return db
          .query(
            `
        SELECT p.*, COUNT(t.id) as taskCount 
        FROM projects p 
        LEFT JOIN tasks t ON p.id = t.projectId 
        GROUP BY p.id
        ORDER BY p.createdAt DESC
      `
          )
          .all();
      })
      .post(
        '/',
        ({ body }) => {
          return db
            .query('INSERT INTO projects (name) VALUES (?) RETURNING *')
            .get(body.name);
        },
        {
          body: t.Object({ name: t.String({ minLength: 1 }) }),
        }
      )
      .post(
        '/:id/tasks',
        ({ params, body }) => {
          return db
            .query(
              'INSERT INTO tasks (projectId, title) VALUES (?, ?) RETURNING *'
            )
            .get(params.id, body.title);
        },
        {
          params: t.Object({ id: t.Numeric() }),
          body: t.Object({ title: t.String({ minLength: 1 }) }),
        }
      )
      .get(
        '/:id/tasks',
        ({ params }) => {
          return db
            .query('SELECT * FROM tasks WHERE projectId = ?')
            .all(params.id);
        },
        {
          params: t.Object({ id: t.Numeric() }),
        }
      )
  )

  // TASKS
  .patch(
    '/tasks/:id',
    ({ params }) => {
      return db
        .query(
          `
      UPDATE tasks 
      SET status = CASE WHEN status = 'Pending' THEN 'Completed' ELSE 'Pending' END 
      WHERE id = ? RETURNING *
    `
        )
        .get(params.id);
    },
    {
      params: t.Object({ id: t.Numeric() }),
    }
  )
  .listen(3000);

console.log(
  `🚀 Backend running at ${app.server?.hostname}:${app.server?.port}`
);
