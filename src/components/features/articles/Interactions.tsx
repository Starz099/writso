"use client";

import Link from "next/link";

const Interactions = ({ statementId }: { statementId: string }) => {
  return (
    <div className="flex gap-2 py-4">
      <Link
        href={`/articles/${statementId}/all-submissions`}
        className="rounded-4xl bg-teal-100 p-2"
      >
        Discussion
      </Link>
      <button className="rounded-4xl bg-teal-100 p-2">⬆</button>
      <button className="rounded-4xl bg-teal-100 p-2">⬇</button>
    </div>
  );
};

export default Interactions;
