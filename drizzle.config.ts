import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_URL);

export default {
  schema: './src/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
