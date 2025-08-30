import { useSession } from "next-auth/react";
import { DailyStatement } from "./DailyStatement";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Hi {session?.user?.name}, ready to sharpen your writing today?
      </h1>
      <DailyStatement />
    </div>
  );
};

export default Dashboard;
