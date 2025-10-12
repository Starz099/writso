export interface Review {
  grammar_feedback: { issue: string; suggestion: string }[];
  readability: { score: string; comments: string };
  improvement_suggestions: string[];
}
