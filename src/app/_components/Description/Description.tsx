import { ArticleStatement } from "@/types";
import { useEffect, useState } from "react";
import { getArticleStatement } from "@/core/api";

interface DescriptionProps {
  statementId: string;
}

const Description = ({ statementId }: DescriptionProps) => {
  const [statement, setStatement] = useState<ArticleStatement | null>();

  useEffect(() => {
    const fetchStatement = async () => {
      try {
        const response = await getArticleStatement(statementId);
        setStatement(response);
      } catch (error) {
        console.error("Failed to fetch daily statement:", error);
      }
    };
    fetchStatement();
  }, [statementId]);
  return (
    <div>
      <h1 className="text-4xl">{statement?.title}</h1>
      <br />
      {statement?.prompt}
    </div>
  );
};

export default Description;
