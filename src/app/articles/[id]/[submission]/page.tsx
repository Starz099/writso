import ShareSubmissionButton from "@/app/_components/ui/share-submission-button";
import { getSubmissionById } from "@/core/api";

const page = async ({
  params,
}: {
  params: Promise<{ submission: string }>;
}) => {
  const { submission } = await params;

  const submissionData = await getSubmissionById(submission);

  return (
    <div className="mt-8 flex w-svw flex-col items-center justify-center px-10">
      <ShareSubmissionButton />
      <br />
      {JSON.stringify(submissionData)}
    </div>
  );
};

export default page;
