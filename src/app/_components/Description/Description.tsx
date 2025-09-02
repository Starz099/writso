import { ArticleStatement } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface DescriptionProps {
  statementId: string;
}

const Description = ({ statementId }: DescriptionProps) => {
  const [statement, setStatement] = useState<ArticleStatement>();

  useEffect(() => {
    const fetchStatement = async () => {
      try {
        const response = await axios.get<ArticleStatement>(
          `/api/article/${statementId}`,
        );
        setStatement(response.data);
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
