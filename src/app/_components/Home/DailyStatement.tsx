import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import type { ArticleStatement } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";

export const DailyStatement = () => {
  const [statement, setStatement] = useState<ArticleStatement>();

  useEffect(() => {
    const fetchDailyStatement = async () => {
      try {
        const response = await axios.get<ArticleStatement>(
          "/api/daily", // Use relative path for API routes
        );
        setStatement(response.data);
      } catch (error) {
        console.error("Failed to fetch daily statement:", error);
      }
    };
    fetchDailyStatement();
  }, []);

  if (!statement) {
    return (
      <Card className="my-6 w-2/3 bg-gray-200 p-6 animate-pulse">
        <CardTitle className="font-serif text-2xl font-bold h-8 bg-gray-300 rounded w-1/2"></CardTitle>
        <CardHeader className="h-6 bg-gray-300 rounded w-3/4 mt-2"></CardHeader>
        <CardContent className="h-4 bg-gray-300 rounded w-full mt-2"></CardContent>
        <CardFooter className="mt-4">
          <div className="h-12 w-32 bg-gray-300 rounded ml-auto"></div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="my-6 w-2/3 bg-emerald-300 p-6">
      <CardTitle className="font-serif text-2xl font-bold">
        TOPIC OF THE DAY :
      </CardTitle>
      <CardHeader>{statement?.title}</CardHeader>
      <CardContent>{statement?.prompt}</CardContent>
      <CardFooter>
        <Link
          href={`/articles/${statement?.id}`}
          className="ml-auto"
        >
          <Button className="cursor-pointer" size="lg">Start Writing</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};