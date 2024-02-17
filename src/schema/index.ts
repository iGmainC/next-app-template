import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { users } from './user';

const queryClient = postgres(process.env.DB_URL || '');
export const db = drizzle(queryClient);

export async function setup() {
  let data = await db.select().from(users);
  return data;
}
