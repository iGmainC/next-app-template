import BasicNavbar from '@/components/nextui-pro/Application/Navbars/BasicNavbar';
import Pagination from '@/components/pagination';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageNum: string };
}) {
  console.log(params.pageNum);
  return (
    <main className="flex flex-col min-h-screen">
      <BasicNavbar loginurl="/auth/signin" signupurl="/auth/signup" />
      <div className="flex-grow">{children}</div>
      <Pagination total={10} queryKey="page" />
    </main>
  );
}
