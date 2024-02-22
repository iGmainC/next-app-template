import RobotCard from '@/components/gptsCard';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = searchParams?.page || '1';
  console.log(currentPage);
  
  return (
    <div>
      <RobotCard
        name={`Robot ${currentPage}`}
        description="123"
        robotId="123"
      />
      <RobotCard
        name={`Robot ${currentPage}`}
        description="123"
        robotId="123"
      />
      <RobotCard
        name={`Robot ${currentPage}`}
        description="123"
        robotId="123"
      />
    </div>
  );
}
