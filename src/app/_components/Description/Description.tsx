import { ArticleStatement } from "@/types";
// import { useEffect, useState } from "react";
import { getArticleStatement } from "@/core/api";

interface DescriptionProps {
  statementId: string;
}

const Description = async ({ statementId }: DescriptionProps) => {
  // const [statement, setStatement] = useState<ArticleStatement | null>();

  // useEffect(() => {
  //   const fetchStatement = async () => {
  //     try {
  //       const response = await getArticleStatement(statementId);
  //       setStatement(response);
  //     } catch (error) {
  //       console.error("Failed to fetch daily statement:", error);
  //     }
  //   };
  //   fetchStatement();
  // }, [statementId]);
  let statement: ArticleStatement | null = null;

  try {
    const response = await getArticleStatement(statementId);
    statement = response;
  } catch (e) {
    console.error("error occured while fetching article statement", e);
  }

  if(!statement) return (
    <div>
      Error occured while fetching statement
    </div>
  )

  return (
    <div>
      <h1 className="text-4xl">{statement?.title}</h1>
      <br />
      {statement?.prompt}
    </div>
  );
};

export default Description;
