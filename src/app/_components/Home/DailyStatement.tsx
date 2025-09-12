import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { ArticleStatement } from "@/types";
import axios from "axios";
import { env } from "process";

export const DailyStatement = async () => {
  let statement = null;

  try {
    statement = (await axios.get<ArticleStatement>(`${process.env.NEXT_PUBLIC_APP_URL}/api/daily`)).data;
  } catch (e) {
    console.log("error fetching daily statement", e);
  }

  if (!statement) {
    return (
      <Card className="my-6 w-2/3 animate-pulse bg-gray-200 p-6">
        <CardTitle className="h-8 w-1/2 rounded bg-gray-300 font-serif text-2xl font-bold"></CardTitle>
        <CardHeader className="mt-2 h-6 w-3/4 rounded bg-gray-300"></CardHeader>
        <CardContent className="mt-2 h-4 w-full rounded bg-gray-300"></CardContent>
        <CardFooter className="mt-4">
          <div className="ml-auto h-12 w-32 rounded bg-gray-300"></div>
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
        <Link href={`/articles/${statement?.id}`} className="ml-auto">
          <Button className="cursor-pointer" size="lg">
            Start Writing
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
