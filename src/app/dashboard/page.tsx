import { DailyStatement } from "../_components/Home/DailyStatement";
import SubmissionsList from "../_components/SubmissionList/SubmissionsList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-5xl">Login to continue</div>;
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Hi {session?.user?.name}, ready to sharpen your writing today?
      </h1>
      <DailyStatement />
      <SubmissionsList />
    </div>
  );
};

export default Dashboard;
