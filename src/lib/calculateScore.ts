import { convert } from "html-to-text";
import checkGrammar from "./languageTool";
import axios from "axios";

type ReadabilityResponse = {
  textCounts: {
    syllableCount: number;
    lexiconCount: number;
    sentenceCount: number;
  };
  readability: {
    fleschReadingEase: number;
    fleschKincaidGrade: number;
    gunningFog: number;
    colemanLiauIndex: number;
    smogIndex: number;
    automatedReadabilityIndex: number;
    daleChallReadabilityScore: number;
  };
};

export function calculateWritingScore(
  text: string,
  langToolData: {
    matches: unknown[];
  },
  readabilityData: ReadabilityResponse,
): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const paragraphCount = text.split(/\n\s*\n/).filter(Boolean).length;
  const errors = langToolData.matches.length;

  // 🧠 Grammar Score (40%)
  // Penalize based on errors per 100 words
  const errorsPer100Words = wordCount > 0 ? (errors / wordCount) * 100 : 0;
  const grammarScore = Math.max(0, 100 - errorsPer100Words * 10); // 1 error per 100 words = -10 points

  // 📖 Readability Score (40%)
  // Use Flesch Reading Ease (0–100)
  let readabilityScore = readabilityData.readability.fleschReadingEase;
  readabilityScore = Math.min(100, Math.max(0, readabilityScore)); // Clamp between 0–100

  // 🧩 Structure Score (20%)
  // Ideal: 3–6 paragraphs for balanced structure
  let structureScore: number;
  if (paragraphCount < 2)
    structureScore = 40; // too short
  else if (paragraphCount <= 6)
    structureScore = 100; // ideal
  else if (paragraphCount <= 10)
    structureScore = 80; // acceptable
  else structureScore = 60; // too long / unbalanced

  // Weighted Final Score
  const finalScore =
    grammarScore * 0.4 + readabilityScore * 0.4 + structureScore * 0.2;
  console.log(Math.round(finalScore));
  return Math.round(finalScore);
}

const calc = async (content: string): Promise<number> => {
  const text = convert(content, {});
  const query = {
    text: text,
  };

  const readabilityRes = (
    await axios.post("https://api.apiverve.com/v1/readabilityscore", query, {
      headers: {
        "X-API-Key": "401bf63e-fa0d-487c-800d-57b2b5282b2c",
        "Content-Type": "application/json",
      },
    })
  ).data as { data: ReadabilityResponse };

  const languageToolRes = await checkGrammar(content);

  return calculateWritingScore(
    content,
    { matches: languageToolRes },
    readabilityRes?.data,
  );
};
export default calc;
