import { Config } from 'drizzle-kit';

const drizzle: Config = {
  driver: 'better-sqlite',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
export default drizzle;
