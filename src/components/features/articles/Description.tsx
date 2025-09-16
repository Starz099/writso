import { ArticleStatement } from "@/types";
import { getArticleStatement } from "@/lib/api";

interface DescriptionProps {
  statementId: string;
}

const Description = async ({ statementId }: DescriptionProps) => {
  let statement: ArticleStatement | null = null;

  try {
    const response = await getArticleStatement(statementId);
    statement = response;
  } catch (e) {
    console.error("error occured while fetching article statement", e);
  }

  if (!statement) return <div>Error occured while fetching statement</div>;

  return (
    <div>
      <h1 className="text-4xl">{statement?.title}</h1>
      <br />
      {statement?.prompt}
    </div>
  );
};

export default Description;
