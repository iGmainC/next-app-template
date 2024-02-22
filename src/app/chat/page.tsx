import { Body } from './body';
import { Sidebar } from './components/sidebar';

export default async function Page() {
  return (
    <div className="flex h-dvh w-full">
      <Sidebar />
      <Body />
    </div>
  );
}
