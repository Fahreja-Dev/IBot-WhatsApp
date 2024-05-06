import { multiApi } from "../multiApi.js";

export const listAi = {
  ai: "ai",
  gemini: "gemini",
};

export const listObjectAi = {
  ai: multiApi.openAi,
  gemini: multiApi.geminiAi,
  imgGemini: multiApi.geminiAi,
};
