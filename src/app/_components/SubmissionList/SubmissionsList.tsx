"use client";
import { useEffect, useState } from "react";
import { Article } from "@/types";
import { getArticles } from "@/core/api";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { FileText, TrendingUp, Clock } from "lucide-react";

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await getArticles();
        if (res) {
          setSubmissions(res.reverse());
        }
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Submissions</h2>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="hover-lift">
              <CardHeader className="pb-4">
                <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
                <div className="mt-2 flex items-center gap-4">
                  <div className="bg-muted h-4 w-16 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-20 animate-pulse rounded" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="bg-muted h-4 w-full animate-pulse rounded" />
                  <div className="bg-muted h-4 w-5/6 animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold">Your Submissions</h2>
          <p className="text-muted-foreground">
            {submissions.length > 0
              ? `${submissions.length} article${submissions.length === 1 ? "" : "s"} written`
              : "No articles yet"}
          </p>
        </div>
        {submissions.length > 0 && (
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <TrendingUp className="mr-1 h-3 w-3" />
            Writing streak
          </Badge>
        )}
      </div>

      {submissions.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent>
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <FileText className="text-muted-foreground h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No submissions yet</h3>
            <p className="text-muted-foreground mb-6">
              Start writing your first article to see it appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {submissions.map((item, index) => {
            const isRecent = index < 2;
            return (
              <Card
                key={item.id}
                className="hover-lift group transition-all duration-200"
              >
                <Link
                  href={`/articles/${item.statementId}/${item.id}`}
                  className="block"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
                          {item.title}
                        </h3>
                        <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Score: {item.score || "Not rated"}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Recent
                          </div>
                        </div>
                      </div>
                      {isRecent && (
                        <Badge className="border-0 bg-green-100 text-green-700">
                          New
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;
