import SubmissionsList from "@/components/features/dashboard/SubmissionsList";
import { Container } from "@/components/ui/container";

const page = () => {
  return (
    <div className="mt-4">
      <Container>
        <SubmissionsList />
      </Container>
    </div>
  );
};

export default page;
