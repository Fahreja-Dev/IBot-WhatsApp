import OpenAI from "openai";
import { manageBot } from "../../config.js";

const openai = new OpenAI({
  organization: manageBot.organizationOpenAi,
  apiKey: manageBot.apiKeyOpenAi,
});

export async function openAI(message) {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      stream: true,
    });

    let output = "";

    for await (const chunk of stream) {
      output += (await chunk.choices[0]?.delta?.content) || "";
    }

    return output;
  } catch (err) {
    return "Telah mencapai batas limit, silahkan coba lagi nanti!";
  }
}
