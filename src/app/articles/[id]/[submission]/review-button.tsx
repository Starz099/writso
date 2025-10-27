"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getDetailedReviewByAi } from "@/lib/ai-review";
import { Review } from "@/types/ai-review";
import { useState } from "react";

const ReviewButton = (props: { content: string }) => {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<Review>();
  const handleReview = async () => {
    setLoading(true);
    try {
      const review = await getDetailedReviewByAi(props.content);
      if (review) {
        setReview(review);
      }
      console.log(review);
    } catch (error) {
      console.error("Failed to get review:", error);
    } finally {
      setLoading(false);
    }
  };

  if (review) {
    return (
      <div className="bg-accent min-w-full rounded-lg border-2 p-4 text-center">
        AI Review
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Grammar</AccordionTrigger>
            <AccordionContent>
              {review.grammar_feedback.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="rounded-lg border-2 bg-cyan-200 p-2"
                  >
                    {item.issue}
                    <br />
                    {item.suggestion}
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Readability</AccordionTrigger>
            <AccordionContent>
              <div className="rounded-lg border-2 bg-cyan-200 p-2">
                <b>Score:</b> {review.readability.score}
                <br />
                <b>Comments:</b> {review.readability.comments}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Suggestions</AccordionTrigger>
            <AccordionContent>
              {review.improvement_suggestions.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="rounded-lg border-2 bg-cyan-200 p-2"
                  >
                    {item}
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <Button onClick={handleReview} disabled={loading}>
      {loading ? "Analyzing..." : "Detailed Analysis"}
    </Button>
  );
};

export default ReviewButton;
