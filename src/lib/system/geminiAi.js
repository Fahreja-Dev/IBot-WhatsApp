import { GoogleGenerativeAI } from "@google/generative-ai";
import { manageBot } from "../../config.js";
import { multiApiGeminiAi } from "../../multiApi.js";
import { multiGeminiAi, switchApiGeminiAi } from "./multiGeminiAi.js";

// Access your API key as an environment variable (see "Set up your API key" above)

export async function geminiAI(message, number = 0) {
  try {
    let resultUser = "";
    let responseUser = await Promise.all(message);

    for (const x of responseUser) {
      resultUser += await x;
    }

    const api = switchApiGeminiAi(
      manageBot,
      multiGeminiAi(multiApiGeminiAi, number, manageBot.multiApiKeyGemini),
      manageBot.multiApiKeyGemini
    );
    for (const resultApi of Object.values(api)) {
      if (resultApi !== undefined) {
        const genAI = new GoogleGenerativeAI(resultApi);
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = resultUser;

        const result = await model.generateContentStream(prompt);

        let text = "";
        for await (const chunk of result.stream) {
          const chunkText = await chunk.text();
          text += await chunkText;
        }

        let outputResult = "";
        let outputResponse = await Promise.all(text);

        for await (const y of outputResponse) {
          outputResult += await y;
        }

        return outputResult;
      }
    }
  } catch (err) {
    return "Gagal memberikan respon, silahkan coba lagi nanti!";
  }
}
