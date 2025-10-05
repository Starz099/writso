import axios from "axios";
import { JSDOM } from "jsdom";

export function convertHtmlToLanguageToolJson(html: string) {
  const annotation: { text?: string; markup?: string }[] = [];

  // Parse HTML using jsdom
  const { window } = new JSDOM("");
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  function traverse(node: Node) {
    if (node.nodeType === window.Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (text.trim() || text.includes(" ")) {
        annotation.push({ text });
      }
    } else if (node.nodeType === window.Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tag = el.tagName.toLowerCase();

      // Skip unsafe tags
      if (["script", "style", "meta", "link"].includes(tag)) return;

      annotation.push({ markup: `<${tag}>` });

      for (const child of Array.from(el.childNodes)) {
        traverse(child);
      }

      annotation.push({ markup: `</${tag}>` });
    }
  }

  for (const child of Array.from(doc.body.childNodes)) {
    traverse(child);
  }

  return { annotation };
}

async function checkGrammar(html: string) {
  const data = convertHtmlToLanguageToolJson(html);

  const response = await axios.post(
    "https://api.languagetoolplus.com/v2/check",
    new URLSearchParams({
      data: JSON.stringify(data),
      language: "en-US",
      enabledOnly: "false",
    }),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  //@ts-expect-error types issue
  return response?.data?.matches;
}

export default checkGrammar;
