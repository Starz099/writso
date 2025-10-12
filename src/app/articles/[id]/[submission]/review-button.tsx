"use client";

import { Button } from "@/components/ui/button";
import { getDetailedReviewByAi } from "@/lib/ai-review";
import { useState } from "react";

const ReviewButton = (props: { content: string }) => {
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    try {
      const review = await getDetailedReviewByAi(props.content);
      console.log(review);
    } catch (error) {
      console.error("Failed to get review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleReview} disabled={loading}>
      {loading ? "Analyzing..." : "Detailed Analysis"}
    </Button>
  );
};

export default ReviewButton;
