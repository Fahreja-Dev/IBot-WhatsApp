import { openAI } from "./system/openAi.js";

export const SelectedMenu = {
  help: function (message) {
    if (message.length === 0) {
      return (
        "==========MENU=========\n" +
        ".owner = Pembuat Bot\n" +
        ".ai = OpenAI\n" +
        ".sticker = Membuat Sticker\n" +
        ".img = Coming Soon\n" +
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
};
