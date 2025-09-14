"use client";
import { useEffect, useState } from "react";
import { Article } from "@/types";
import { getArticles } from "@/core/api";

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState<Article[]>([]);
  useEffect(() => {
    async function fetchSubmissions() {
      const res = await getArticles();
      if (res) {
        setSubmissions(res);
      }
    }
    fetchSubmissions();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Submissions</h1>
      <ul className="space-y-4">
        {submissions &&
          submissions.map((item) => {
            return (
              <li key={item.id} className="rounded-md border p-4">
                <h1 className="text-xl font-semibold">{item.title}</h1>
                <h2 className="text-xl font-semibold">{item.content}</h2>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SubmissionsList;
