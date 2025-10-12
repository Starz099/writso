"use client";

import { Button } from "@/components/ui/button";
import { getDetailedReviewByAi } from "@/lib/ai-review";

const ReviewButton = (props: { content: string }) => {
  return (
    <Button
      onClick={() => {
        getDetailedReviewByAi(props.content);
      }}
    >
      Detailed Analysis
    </Button>
  );
};
export default ReviewButton;
