import CommentBox from "@/components/ui/comment-box";
import ShareSubmissionButton from "@/components/ui/share-submission-button";
import { getSubmissionById } from "@/lib/api";

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
      <CommentBox submissionId={submission} />
    </div>
  );
};

export default page;
