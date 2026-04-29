type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  error?: {
    message?: string;
  };
};

export type AppealGenerationInput = {
  ownerName: string;
  taxYear: string;
  address: string;
  county: string;
  state: string;
  propertyType: string;
  squareFootage?: number;
  lotSize?: number;
  yearBuilt?: number;
  bedrooms?: number;
  bathrooms?: number;
  upgrades?: string;
  currentValue?: number;
  notes?: string;
  comparableProperties?: string;
  jurisdictionNotes?: string;
};

export type AppealGenerationResult = {
  analysis: string;
  appealLetter: string;
};

async function callOpenAI(instructions: string, inputText: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is missing. Add it to your environment before generating responses."
    );
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
      reasoning: { effort: "low" },
      instructions,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: inputText,
            },
          ],
        },
      ],
    }),
  });

  const payload = (await response.json()) as OpenAIResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message || "OpenAI request failed.");
  }

  const rawText = extractOutputText(payload);

  if (!rawText) {
    throw new Error("OpenAI returned an empty response.");
  }

  return rawText;
}

function extractOutputText(payload: OpenAIResponse): string {
  if (payload.output_text) {
    return payload.output_text;
  }

  return (payload.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text" || item.type === "text")
    .map((item) => item.text ?? "")
    .join("\n")
    .trim();
}

function parseJsonResponse(rawText: string): AppealGenerationResult {
  const cleaned = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned) as Partial<AppealGenerationResult>;

  if (!parsed.analysis || !parsed.appealLetter) {
    throw new Error("The AI response did not include the required sections.");
  }

  return {
    analysis: parsed.analysis.trim(),
    appealLetter: parsed.appealLetter.trim(),
  };
}

export async function generateAppealContent(
  input: AppealGenerationInput
): Promise<AppealGenerationResult> {
  const rawText = await callOpenAI(
    "You help U.S. property owners prepare property tax appeal drafts. Use only the facts, comparable property details, and jurisdiction notes provided in the request. Do not invent statutes, deadlines, sales, or legal requirements. If supporting tax rules or comps are missing, say that clearly in the analysis and keep the letter conservative. Return valid JSON with exactly two string fields: analysis and appealLetter.",
    JSON.stringify(input, null, 2)
  );

  return parseJsonResponse(rawText);
}

export async function generateChatReply(message: string): Promise<string> {
  return callOpenAI(
    "You are the LoneStarAppeals.AI assistant. Answer clearly and professionally about property tax appeal preparation, the website workflow, comparable properties, county/state rules, and next steps inside the app. Do not pretend to know county-specific legal rules unless the user supplies them. Keep answers concise and practical.",
    message
  );
}
