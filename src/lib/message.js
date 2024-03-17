import { openAI } from "./system/openAi.js";
import { geminiAI } from "./system/geminiAi.js";
import { geminiImageAi } from "./system/geminiImage.js";
import { searchImagesUnsplash } from "./system/searchImageUnsplash.js";
import { lyricMusicUrl } from "./system/lyricMusicUrl.js";

export const SelectedMenu = {
  menu: function (message, username) {
    if (message.length === 0) {
      return (
        "Halo, " + username + "\n\n" +
        "> Jika kamu butuh bantuan dalam menggunakan Menu\n" +
        "> Silahkan Ketik: .help\n\n" +
        "―――――[ MENU ]―――――\n" +
        "*.owner =* _Pembuat Bot_\n" +
        "*.ai =* _OpenAI_\n" +
        "*.gemini =* _GeminiAI_\n" +
        "*.imgGemini =* _GeminiAI Mengenali Objek Gambar_\n" +
        "*.sticker =* _Membuat Sticker_\n" +
        "*.ytmp3 =* _Youtube Convert MP3_\n" +
        "*.ytvoice =* _Youtube Convert Voice_\n" +
        "*.unsplash =* _Search Image Unsplash_\n" +
        "*.lyricmusic =* _Search Music Lyrics_\n" +
        "*.imganime =* _Coming Soon_\n" +
        "―――――――――――――――\n"
      );
    }
  },

  help: function (message) {
    if (message.length === 0) {
      return (
        "―――――[ HELP ]―――――\n" +
        "*.owner =* _Teks_\n" +
        "*.ai =* _Teks_\n" +
        "*.gemini =* _Teks_\n" +
        "*.imgGemini =* _Image & Teks_\n" +
        "*.sticker =* _Image / Video / Gif_\n" +
        "*.ytmp3 =* _Link_\n" +
        "*.ytvoice =* _Link_\n" +
        "*.unsplash =* _Teks_\n" +
        "*.lyricmusic =* _Teks_\n" +
        "――――――――――――――\n"
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
  ytvoice: async function (message) {
    if (message.length !== 0) {
      let object = {
        sendAudioAsVoice: true,
      };
      return object;
    }
  },

  lyricmusic: async function (message) {
    if (message.length !== 0) {
      const lyricMusic = await lyricMusicUrl(message)

      return lyricMusic
    }
  }
};
