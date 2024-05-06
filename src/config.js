export const config = {
  openAi: {
    /* Pengaturan Open AI
  Website untuk mendapatkan API & Organization : https://platform.openai.com/api-keys */
    multiApi: true, // Untuk mengaktifkan fitur multi API OpenAI [true] dan untuk menonaktifkan [false], kamu bisa atur API nya di file [multiApi.js]
    organization: "Organization kamu",
    apiKey: "ApiKey kamu"
  },

  geminiAi: {
    /* ~Pengaturan Gemini AI~
    Website untuk mendapatkan API : https://aistudio.google.com/app/apikey */
    multiApi: true, // Untuk mengaktifkan fitur multi API GeminiAI [true] dan untuk menonaktifkan [false], kamu bisa atur API nya di file [multiApi.js]
    apiKey: "ApiKey kamu"
  },

  unsplash: {
    /* ~Pengaturan search Image Unsplash~
    Website untuk mendapatkan Access Key : https://unsplash.com/oauth/applications */
    accessKey: "Access Key kamu"
  },

  lyricMusic: {
    /* ~Pengaturan Lyric Music~
   Website untuk mendapatkan Access Token : https://genius.com/api-clients
   Gunakan socks proxy untuk mengaktifkan fitur Lyric Music jika terjadi error, atur proxy kamu di file [proxy.js]
  */
    accessToken: "Access Token kamu"
  }
};
