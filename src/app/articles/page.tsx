import { getAllArticleStatements } from "@/core/api";
import Link from "next/link";

const page = async () => {
  let statements = null;
  try {
    statements = await getAllArticleStatements();
  } catch (e) {
    console.log("error while fetching all statements in frontend", e);
  }

  if (!statements) {
    return <div>an error occured while fetching all statements</div>;
  }

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

export default page;
