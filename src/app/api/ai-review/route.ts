import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { NextRequest, NextResponse } from "next/server";
import { Review } from "@/types/ai-review";

const token = process.env.GITHUB_AI_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<Review | undefined>> {
  const { content } = await req.json();
  try {
    console.log("token:", token);
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token as string),
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content:
              "You are an expert writing reviewer with deep knowledge of grammar, readability, and writing improvement. Below is an article written by a user. The article content is provided in HTML format.",
          },
          {
            role: "user",
            content: `Please:
1. Parse and interpret the HTML properly to understand headings, paragraphs, and structure.
2. Identify and list **grammatical mistakes** (spelling, punctuation, tense, agreement, etc.) with clear explanations.
3. Evaluate the **readability** of the article (clarity, flow, sentence length, paragraph structure, etc.), and rate it as: Excellent / Good / Average / Poor.
4. Give **actionable suggestions for improvement**, such as rephrasing awkward sentences, improving transitions, or enhancing vocabulary.
5. Keep the tone constructive and encouraging — the goal is to help the writer grow.

Finally, structure your response in this JSON format:

{
  "grammar_feedback": [
    { "issue": "Incorrect verb tense in paragraph 2", "suggestion": "Use present perfect instead of past simple." },
    ...
  ],
  "readability": {
    "score": "Good",
    "comments": "The article flows well but a few long sentences could be simplified."
  },
  "improvement_suggestions": [
    "Add a stronger conclusion that ties back to your introduction.",
    "Use more transition words to connect ideas smoothly."
  ]
}

Here is the article HTML:

${content}`,
          },
        ],
        model: model,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    console.log(response.body.choices[0].message.content);
    const review = JSON.parse(
      response.body.choices[0].message.content as string,
    ) as Review;
    return NextResponse.json(review);
  } catch (e) {
    console.error("An error occured during ai review request:", e);
    return NextResponse.json(undefined);
  }
}
