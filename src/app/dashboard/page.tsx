"use client"

import { useSession } from "next-auth/react";
import { DailyStatement } from "../_components/Home/DailyStatement";
import SubmissionsList from "../_components/SubmissionList/SubmissionsList";

const Dashboard = () => {
  const { data: session } = useSession();
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