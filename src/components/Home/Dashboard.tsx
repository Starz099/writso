import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Hi {session?.user?.name} 👋, ready to sharpen your writing today?</h1>
    </div>
  );
};

export default Dashboard;
