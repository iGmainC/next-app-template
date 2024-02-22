import { createClient } from 'redis';
const client = await createClient({
  url: process.env.KV_URL,
});

export function setValue(key: string, value: string, expire: number) {
  client.set(key, value, {
    EX: expire,
  });
}

export async function getValue(key: string) {
  return await client.get(key);
}

// key是否存在
export async function exists(key: string) {
  return await client.exists(key);
}
