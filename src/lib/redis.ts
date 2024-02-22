'use server';
import { createClient } from 'redis';
const client = createClient({
  url: process.env.KV_URL,
});

export async function setValue(key: string, value: string, expire: number) {
  await client.set(key, value, {
    EX: expire,
  });
}

export async function getValue(key: string) {
  return await client.get(key);
}

// key是否存在
export async function exists(key: string) {
  let lifeTime = await client.exists(key);
  if (lifeTime > 0) return true;
  else return false;
}
