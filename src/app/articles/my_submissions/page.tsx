import SubmissionsList from "@/components/features/dashboard/SubmissionsList";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { User } from "lucide-react";

const Page = () => {
  return (
    <main>
      <Section size="sm" className="bg-background border-b">
        <Container>
          <div className="flex items-center gap-4">
            <User className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">
                My Submissions
              </h1>
              <p className="text-muted-foreground mt-1">
                View and manage all your past writing submissions.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SubmissionsList />
        </Container>
      </Section>
    </main>
  );
};

export default Page;
