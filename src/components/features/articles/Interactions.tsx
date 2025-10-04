"use client";

import Link from "next/link";

const Interactions = ({ statementId }: { statementId: string }) => {
  return (
    <div className="flex gap-2 py-4">
      <Link
        href={`/articles/${statementId}/all_submissions`}
        className="rounded-4xl bg-teal-100 p-2"
      >
        All submissions
      </Link>
      <Link
        href={`/articles/${statementId}/my_submissions`}
        className="rounded-4xl bg-teal-100 p-2"
      >
        My submissions
      </Link>
      {/* TODO: implement upVotes and downVotes */}
      {/* <button className="rounded-4xl bg-teal-100 p-2">⬆</button>
      <button className="rounded-4xl bg-teal-100 p-2">⬇</button> */}
    </div>
  );
};

export default Interactions;
