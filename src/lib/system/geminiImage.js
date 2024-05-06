import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../../config.js";
import { multiApi } from "../../multiApi.js";
import { multiGeminiAi, switchApiGeminiAi } from "./multiGeminiAi.js";

function fileToGenerativePart(base64Image, mimeType) {
  return {
    inlineData: {
      data: base64Image,
      mimeType,
    },
  };
}

export async function geminiImageAi(
  message,
  base64Image,
  mimeType,
  number = 0
) {
  try {
    let resultUser = "";
    let responseUser = await Promise.all(message);

    for (const x of responseUser) {
      resultUser += await x;
    }

    const api = switchApiGeminiAi(
      config.geminiAi,
      multiGeminiAi(multiApi.geminiAi, number, config.geminiAi.multiApi),
      config.geminiAi.multiApi
    );
    for (const resultApi of Object.values(api)) {
      if (resultApi !== undefined) {
        const genAI = new GoogleGenerativeAI(resultApi);

        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const prompt = resultUser;

        const imageParts = [fileToGenerativePart(base64Image, mimeType)];

        const result = await model.generateContentStream([
          prompt,
          ...imageParts,
        ]);

        let text = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          text += chunkText;
        }
        const response = await text;
        return response;
      }
    }
  } catch (err) {
    const checkMessage =
      message.length > 0
        ? "Tidak dapat menemukan objek gambar tersebut, silahkan gunakan gambar lain!"
        : "Silahkan berikan pesan kamu, untuk permintaan yang bisa kami bantu!";
    return checkMessage;
  }
}
