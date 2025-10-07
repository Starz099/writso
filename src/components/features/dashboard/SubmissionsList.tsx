"use client";
import { useEffect, useState } from "react";
import { Article } from "@/types";
import { getArticles } from "@/lib/api";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, Clock } from "lucide-react";

const SubmissionsList = ({ limit }: { limit?: number }) => {
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
      <div className="space-y-4">
        {[...Array(limit || 3)].map((_, i) => (
          <Card key={i} className="shadow-soft">
            <CardHeader>
              <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
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
    );
  }

  const displayedSubmissions = limit
    ? submissions.slice(0, limit)
    : submissions;

  return (
    <div>
      {submissions.length === 0 ? (
        <Card className="shadow-soft py-12 text-center">
          <CardContent>
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <FileText className="text-primary h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No submissions yet</h3>
            <p className="text-muted-foreground mb-6">
              Start writing your first article to see it appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {displayedSubmissions.map((item, index) => (
            <Link
              key={item.id}
              href={`/articles/${item.statementId}/${item.id}`}
              className="block"
            >
              <Card className="hover-lift group shadow-soft transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <h3 className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
                      {item.title}
                    </h3>
                    {index < 2 && <Badge variant="secondary">New</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-muted-foreground line-clamp-2 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: item.content as string,
                    }}
                  ></p>
                  <div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4" />
                      <span>Score: {item.score || "Not rated"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>Recent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;
