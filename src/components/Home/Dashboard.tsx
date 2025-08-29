import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Statement {
  title: string;
  id: string;
  prompt: string;
  createdAt: Date;
}

const Dashboard = () => {
  const [sotd, setSotd] = useState<Statement>();
  useEffect(() => {
    const fn = async () => {
      try {
        const response = await axios.get<Statement>(
          "http://localhost:3000/api/daily",
        );
        setSotd(response.data);
      } catch (error) {
        console.error("Failed to fetch daily statement:", error);
      }
    };
    fn();
  }, []);
  const { data: session } = useSession();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Hi {session?.user?.name}, ready to sharpen your writing today?
      </h1>
      <Card className="my-6 w-2/3 bg-emerald-300 p-6">
        <CardTitle className="font-serif text-2xl font-bold">
          TOPIC OF THE DAY :
        </CardTitle>
        <CardHeader>{sotd?.title}</CardHeader>
        <CardContent>{sotd?.prompt}</CardContent>
        <CardFooter>
          <Link
            href={`/articles/${sotd?.id}`}
            className="ml-auto"
          >
            <Button className="cursor-pointer" size="lg">Start Writing</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
