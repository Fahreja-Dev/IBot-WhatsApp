import { openAI } from "./system/openAi.js";
import { geminiAI } from "./system/geminiAi.js";
import { geminiImageAi } from "./system/geminiImage.js";
import { searchImagesUnsplash } from "./system/searchImageUnsplash.js";

export const SelectedMenu = {
  help: function (message) {
    if (message.length === 0) {
      return (
        "==========MENU=========\n" +
        ".owner = Pembuat Bot\n" +
        ".ai = OpenAI\n" +
        ".gemini = GeminiAI\n" +
        ".imgGemini = GeminiAI Mengenali Objek Gambar\n" +
        ".sticker = Membuat Sticker\n" +
        ".ytmp3 = Youtube Convert MP3\n" +
        ".imganime = Coming Soon\n" +
        "_________________________________"
      );
    }
  },

  ai: async function (message) {
    if (message[0]) {
      let ai = await openAI(message[1], message[0]);
      return ai;
    } else {
      let ai = await openAI(message[1]);
      return ai;
    }
  },

  gemini: async function (message) {
    if (message[0]) {
      let gemini = await geminiAI(message[1], message[0]);
      return gemini;
    } else {
      let gemini = await geminiAI(message[1]);
      return gemini;
    }
  },

  imgGemini: async function (message, base64Image, mimeType, number) {
    if (base64Image !== undefined) {
      if (message) {
        let geminiImage = await geminiImageAi(
          message,
          base64Image,
          mimeType,
          number
        );
        return geminiImage;
      } else {
        let geminiImage = await geminiImageAi(message, base64Image, mimeType);
        return geminiImage;
      }
    }
  },

  owner: function (message) {
    if (message.length === 0) {
      return (
        "=========OWNER=========\n" +
        "Nama : *Fahreja Dev*\n" +
        "Kontak : *081219859098*\n" +
        "_________________________________"
      );
    }
  },

  sticker: function (message) {
    if (message.length === 0) {
      const object = {
        sendMediaAsSticker: true,
        stickerAuthor: "Fahreja Dev",
        stickerName: "IBot WhatsApp",
      };

      return object;
    }
  },
  ytmp3: function (message) {
    if (message.length !== 0) {
      let object = {
        sendMediaAsDocument: true,
      };
      return object;
    }
  },
  unsplash: async function (message) {
    if (message.length !== 0) {
      const searchImage = await searchImagesUnsplash(message)

      return searchImage
    }
  },
};
