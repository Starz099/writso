import { DailyStatement } from "@/components/features/dashboard/DailyStatement";
import SubmissionsList from "@/components/features/dashboard/SubmissionsList";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PenTool, BookOpen } from "lucide-react";
import Link from "next/link";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <Section size="lg">
        <Container className="text-center">
          <div className="mx-auto max-w-md">
            <div className="bg-muted mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl">
              <PenTool className="text-muted-foreground h-8 w-8" />
            </div>
            <h2 className="mb-4">Welcome to Writso</h2>
            <p className="text-muted-foreground mb-8">
              Please sign in to access your dashboard and start your writing
              journey.
            </p>
            <Button asChild size="lg">
              <Link href="/">Sign In to Continue</Link>
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <main>
      {/* Welcome Section */}
      <Section size="sm" className="border-b">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2">
                Welcome back, {session?.user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to sharpen your writing skills today?
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/articles" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Browse Articles
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/articles" className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  New Article
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Daily Statement Section */}
      <Section background="muted">
        <Container>
          <DailyStatement />
        </Container>
      </Section>

      {/* Submissions Section */}
      <Section>
        <Container>
          <SubmissionsList />
        </Container>
      </Section>
    </main>
  );
};

export default Dashboard;
