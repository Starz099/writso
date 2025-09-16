"use client";
import { getAllArticleStatements } from "@/lib/api";
import { ArticleStatement } from "@prisma/client";
import Link from "next/link";

import { useEffect, useState } from "react";

const Page = () => {
  const [statements, setStatements] = useState<ArticleStatement[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllArticleStatements();
        setStatements(result);
      } catch (e) {
        console.error("Client-side error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!statements) return <div>No statements</div>;
  return (
    <div className="mt-5 px-10">
      {statements.map((item) => {
        return (
          <li key={item.id} className="rounded-md border p-4">
            <Link href={`/articles/${item.id}`}>
              <h1 className="text-xl font-semibold">{item.title}</h1>
              <h2 className="text-xl font-semibold">Score: {item.prompt}</h2>
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default Page;
