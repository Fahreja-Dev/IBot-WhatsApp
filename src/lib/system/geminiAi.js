import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../../config.js";
import { multiApi } from "../../multiApi.js";
import { multiGeminiAi, switchApiGeminiAi } from "./multiGeminiAi.js";


export async function geminiAI(message, number = 0) {
  try {
    let resultUser = "";
    let responseUser = await Promise.all(message);

    for (const x of responseUser) {
      resultUser += x;
    }

    const api = switchApiGeminiAi(
      config.geminiAi,
      multiGeminiAi(multiApi.geminiAi, number, config.geminiAi.multiApi),
      config.geminiAi.multiApi
    );

    for (const resultApi of Object.values(api)) {
      if (resultApi !== undefined) {
        const genAI = new GoogleGenerativeAI(resultApi);

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = resultUser;

        const result = await model.generateContentStream(prompt);

        let text = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          text += chunkText;
        }

        let outputResult = "";
        let outputResponse = await Promise.all(text);

        for (const y of outputResponse) {
          outputResult += y;
        }

        return outputResult;
      }
    }
  } catch (err) {
    return "Gagal memberikan respon, silahkan coba lagi nanti!";
  }
}
