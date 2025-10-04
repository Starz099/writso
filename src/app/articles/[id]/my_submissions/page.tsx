"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Article } from "@/types/models";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [submissions, setSubmissions] = useState<Article[]>([]);

  const getAllSubmissions = async (id: string) => {
    const res = (
      await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/article_statement/${id}/my_submissions`,
      )
    ).data;
    //@ts-expect-error res type undefined
    return res.submissions as Article[];
  };

  useEffect(() => {
    const fn = async () => {
      setSubmissions((await getAllSubmissions(params.id)).reverse());
    };
    fn();
  }, [params.id]);

  return (
    <div>
      <Container>
        <h1 className="mb-4 text-3xl font-bold">All Submissions</h1>
        <div className="flex flex-col gap-4">
          {submissions.map((submission) => (
            <Link
              href={`/articles/${params.id}/${submission.id}`}
              key={submission.id}
            >
              <Card className="cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{submission.title}</CardTitle>
                  <CardDescription
                    dangerouslySetInnerHTML={{
                      __html: submission.content.substring(0, 100) as string,
                    }}
                  ></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground flex justify-between text-sm">
                    <span>Score: {submission.score}</span>
                    <span>
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Page;
