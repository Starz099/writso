import { Review } from "@/types/ai-review";
import axios from "axios";

export async function getDetailedReviewByAi(
  content: string | undefined,
): Promise<Review | undefined> {
  try {
    const response = await axios.post<Review>("/api/ai-review", { content });
    return response.data;
  } catch (e) {
    console.error("An error occured during ai review request:", e);
    return undefined;
  }
}
