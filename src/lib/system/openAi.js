import OpenAI from "openai";
import { manageBot } from "../../config.js";
import { multiOpenAi, switchApiOpenAi } from "./multiOpenAi.js";
import { multiApiOpenAi } from "../../multiApi.js";

export async function openAI(message, number = 0) {
  try {
    const api = switchApiOpenAi(
      manageBot,
      multiOpenAi(multiApiOpenAi, number, manageBot.multiApiKey),
      manageBot.multiApiKey
    );

    const openai = new OpenAI({
      organization: api.organizationOpenAi,
      apiKey: api.apiKeyOpenAi,
    });

    let resultUser = "";
    let responseUser = await Promise.all(message);

    for (const x of responseUser) {
      resultUser += await x;
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: resultUser }],
      stream: true,
    });

    let output = "";

    for await (const chunk of stream) {
      output += (await chunk.choices[0]?.delta?.content) || "";
    }

    let outputResult = "";
    let outputResponse = await Promise.all(output);

    for await (const y of outputResponse) {
      outputResult += await y;
    }

    return outputResult;
  } catch (err) {
    return "Telah mencapai batas limit, silahkan coba lagi nanti!";
  }
}
