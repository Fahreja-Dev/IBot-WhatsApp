import { menu } from "./lib/menu.js";
import { SelectedMenu } from "./lib/message.js";
import { filtersMessage } from "./lib/system/filterMessage.js";
import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";
import { formatMessage } from "./lib/system/formatMessage.js";
import { config } from "./config.js";
import messageMedia from "whatsapp-web.js";
import { sticker } from "./lib/system/sticker.js";
import { listAi, listObjectAi } from "./lib/ai.js";
import { IBotMp3 } from "./lib/system/ytmp3.js";
import { videoSticker } from "./lib/system/videoSticker.js";
import { requestUrlUnsplash } from "./lib/system/searchImageUnsplash.js";
import { ytVoice } from "./lib/system/ytVoice.js";
import { lyricMusic } from "./lib/system/lyricMusic.js";

const { MessageMedia } = messageMedia;

const client = new Client({
  puppeteer: {
    executablePath: '/usr/bin/google-chrome-stable',
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Silahkan scan kode QR diatas!");
});

client.on("ready", () => {
  console.log("\nBerhasil terhubung WhatsApp!\n\n");
  console.log("History :\n");
});

let number = 0;

client.on("message", async (message) => {
  const filterMessage =
    filtersMessage(message.body, menu) !== undefined
      ? filtersMessage(message.body, menu)
      : false;

  const phoneNumber =
    typeof message._data.id.participant === "string"
      ? message._data.id.participant.replace("@c.us", "")
      : message._data.from.replace("@c.us", "");

  console.log(
    `\x1b[36m[ ${message.deviceType} ][ ${message._data.notifyName
    } ] \x1b[35m${phoneNumber} => \x1b[33m${formatMessage(message)} \x1b[37m`
  );

  if (
    SelectedMenu.hasOwnProperty(filterMessage.keyMessage) &&
    SelectedMenu[filterMessage.keyMessage](filterMessage.message) !== undefined
  ) {
    await message.react("⏳");
    try {
      const mediaFile = await message.downloadMedia();
      if (
        listObjectAi.hasOwnProperty(filterMessage.keyMessage) &&
        config.openAi.multiApi
      ) {
        if (
          number ===
          Object.values(listObjectAi[filterMessage.keyMessage]).length
        ) {
          number = 0;
        }
        number++;
      }

      const outputMessage =
        filterMessage.keyMessage === listAi[filterMessage.keyMessage]
          ? await SelectedMenu[filterMessage.keyMessage]([
            number,
            filterMessage.message,
          ])
          : filterMessage.keyMessage === "menu" ? await SelectedMenu[filterMessage.keyMessage](filterMessage.message, message._data.notifyName)
            : filterMessage.keyMessage === "imgGemini" && message.type === "image"
              ? await SelectedMenu[filterMessage.keyMessage](
                filterMessage.message,
                mediaFile.data,
                mediaFile.mimetype,
                number
              )
              : filterMessage.keyMessage === "sticker"
                ? await SelectedMenu[filterMessage.keyMessage](filterMessage.message)
                : await SelectedMenu[filterMessage.keyMessage](filterMessage.message);

      if (filterMessage.keyMessage === "sticker" && message.type === "image") {
        const media = new MessageMedia(mediaFile.mimetype, mediaFile.data);
        if (message.type === "image") {
          await sticker(filterMessage.message, message, media, outputMessage);
        } else if (message.type === "video") {
          await videoSticker(media, message, outputMessage);
        }
      } else if (filterMessage.keyMessage === "ytmp3") {
        await IBotMp3(message, filterMessage.message, outputMessage);
      } else if (filterMessage.keyMessage === "unsplash") {
        await requestUrlUnsplash(message, outputMessage)
      } else if (filterMessage.keyMessage === "ytvoice") {
        await ytVoice(message, filterMessage.message, outputMessage)
      } else if (filterMessage.keyMessage === "lyricmusic") {
        await lyricMusic(message, outputMessage)
      }

      if (filterMessage.keyMessage === "imgGemini") {
        if (message.type === "image") {
          await message.reply(outputMessage);
          await message.react("✅");
        } else {
          await message.react("❌");
        }
      } else if (filterMessage.keyMessage === "sticker") {
        if (message.type === "image" || message.type === "video") {
          await message.react("✅");
        } else {
          await message.react("❌");
        }
      } else {
        await message.reply(outputMessage);
        await message.react("✅");
      }
    } catch (error) {
      console.log(
        `\x1b[36m[ ${message._data.notifyName} ] \x1b[35m${phoneNumber} => \x1b[33mPesan Telah Di Hapus! \x1b[37m`
      );
    }
  }
});

client.initialize();
