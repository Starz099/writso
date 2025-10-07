import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ArticleStatement } from "@/types";
import { getDailyStatement } from "@/lib/api";
import { Calendar, PenTool } from "lucide-react";

export const DailyStatement = async () => {
  let statement: ArticleStatement | null = null;

  try {
    statement = await getDailyStatement();
  } catch (e) {
    console.log("error fetching daily statement", e);
  }

  if (!statement) {
    return (
      <Card className="shadow-soft">
        <CardHeader>
          <div className="bg-muted h-8 w-3/4 animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-5/6 animate-pulse rounded" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="bg-muted h-10 w-32 animate-pulse rounded" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Daily Challenge</span>
          </div>
          <Badge variant="secondary">Today</Badge>
        </div>
        <CardTitle className="text-2xl font-bold">{statement?.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {statement?.prompt}
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild size="lg" className="group">
          <Link
            href={`/articles/${statement?.id}`}
            className="flex items-center gap-2"
          >
            <PenTool className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Start Writing
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
