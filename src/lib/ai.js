import { multiApiOpenAi, multiApiGeminiAi } from "../multiApi.js";

export const listAi = {
  ai: "ai",
  gemini: "gemini",
};

export const listObjectAi = {
  ai: multiApiOpenAi,
  gemini: multiApiGeminiAi,
};
