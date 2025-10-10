import { DailyStatement } from "@/components/features/dashboard/DailyStatement";
import SubmissionsList from "@/components/features/dashboard/SubmissionsList";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PenTool, BookOpen, LogIn } from "lucide-react";
import Link from "next/link";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <Section size="lg">
        <Container className="text-center">
          <div className="mx-auto max-w-md">
            <div className="bg-primary/10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
              <LogIn className="text-primary h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter">
              Access Denied
            </h2>
            <p className="text-muted-foreground mt-4 mb-8">
              You must be signed in to view this page. Please sign in to
              continue.
            </p>
            <Button asChild size="lg">
              <Link href="/api/auth/signin">Sign In</Link>
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <main>
      <Section size="sm" className="bg-background border-b">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">
                Welcome back, {session?.user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Here is your daily writing prompt and recent submissions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link href="/articles" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Browse Articles
                </Link>
              </Button>
              <Button asChild>
                <Link href="/articles" className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Start Writing
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section>
            <Container>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  Daily Prompt
                </h2>
              </div>
              <DailyStatement />
            </Container>
            <Container className="mt-4">
              <Link href="/articles/freestyle">
                <Button>Freestyle writing</Button>
              </Link>
            </Container>
          </Section>
        </div>
        <div className="lg:col-span-1">
          <Section background="muted">
            <Container>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  Recent Submissions
                </h2>
                <Button asChild variant="outline" size="sm">
                  <Link href="/articles/my_submissions">View all</Link>
                </Button>
              </div>
              <SubmissionsList limit={2} />
            </Container>
          </Section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
