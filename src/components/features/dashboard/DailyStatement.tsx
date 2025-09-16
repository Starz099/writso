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
import { Calendar, PenTool, Sparkles } from "lucide-react";

export const DailyStatement = async () => {
  let statement: ArticleStatement | null = null;

  try {
    statement = await getDailyStatement();
  } catch (e) {
    console.log("error fetching daily statement", e);
  }

  if (!statement) {
    return (
      <Card className="from-primary/5 via-background to-accent/5 hover-lift relative overflow-hidden border-0 bg-gradient-to-br shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-muted h-8 w-24 animate-pulse rounded" />
            </div>
            <div className="bg-muted h-6 w-16 animate-pulse rounded-full" />
          </div>
          <div className="bg-muted h-8 w-3/4 animate-pulse rounded" />
        </CardHeader>
        <CardContent className="pb-6">
          <div className="space-y-2">
            <div className="bg-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-5/6 animate-pulse rounded" />
            <div className="bg-muted h-4 w-4/6 animate-pulse rounded" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="bg-muted h-10 w-32 animate-pulse rounded" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="from-primary/5 via-background to-accent/5 hover-lift group relative overflow-hidden border-0 bg-gradient-to-br shadow-lg">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-10 transition-opacity group-hover:opacity-20">
        <Sparkles className="text-primary h-8 w-8" />
      </div>

      <CardHeader className="pb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Daily Challenge</span>
          </div>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-0"
          >
            Today
          </Badge>
        </div>
        <CardTitle className="from-foreground to-primary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
          {statement?.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-6">
        <p className="text-muted-foreground leading-relaxed">
          {statement?.prompt}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild size="lg" className="group/btn hover-lift">
          <Link
            href={`/articles/${statement?.id}`}
            className="flex items-center gap-2"
          >
            <PenTool className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
            Start Writing
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
