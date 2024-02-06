import { setup } from '@/schema';

export default async function Home() {
  let userData = await setup();
  return <h1>{JSON.stringify(userData)}</h1>;
}
