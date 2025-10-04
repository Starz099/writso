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
  const title = submissionData?.title;
  const content = submissionData?.content;
  const authorName = submissionData?.user?.name;

  console.log(submissionData);
  return (
    <div className="mt-8 flex w-svw flex-col items-center justify-center px-10">
      <ShareSubmissionButton />
      <br />
      <div className="border-b-2 text-4xl">{title}</div>
      <br />
      <div className="text-2xl">
        <div dangerouslySetInnerHTML={{ __html: content as string }} />-
        {authorName}
      </div>
      <br />
      <CommentBox submissionId={submission} />
    </div>
  );
};

export default page;
