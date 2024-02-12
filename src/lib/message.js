import { openAI } from "./system/openAi.js";

export const SelectedMenu = {
  menu: function (message) {
    if (message.length === 0) {
      return (
        "==========MENU=========\n" +
        ".owner = Pembuat Bot\n" +
        ".ai = OpenAI\n" +
        ".img = Coming Soon\n" +
        ".imganime = Coming Soon\n" +
        "_________________________________"
      );
    }
  },

  ai: async function (message) {
    let ai = await openAI(message);
    return ai;
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
};
