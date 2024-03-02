import ytdlPkg from "ytdl-core";
import messageMedia from "whatsapp-web.js";
const { MessageMedia } = messageMedia;
const ytdl = ytdlPkg;

function filterTime(message) {
  const findDate = new RegExp(".+?T", "g");
  const date = message.match(findDate)[0].replace(/T/g, "");

  const findClock = new RegExp("T.+?-", "g");
  const clock = message.match(findClock)[0].replace(/T|-/g, "");

  const object = {
    tanggal: date,
    jam: clock,
  };
  return object;
}

async function base64Mp3(url) {
  return new Promise((resolve, reject) => {
    const videoStream = ytdl(url, { quality: "highestaudio" });

    const dataStream = [];

    videoStream.on("data", (data) => {
      dataStream.push(data);
    });

    videoStream.on("end", () => {
      const bufferVideo = Buffer.concat(dataStream).toString("base64");
      resolve(bufferVideo);
    });

    videoStream.on("error", (err) => {
      reject(`Error: ${err}`);
    });
  });
}

async function IBotMp3Title(url) {
  const infoVideo = (await ytdl.getInfo(url)).videoDetails;

  const IBotYoutube = {
    namaBand: infoVideo.author.name,
    judul: infoVideo.title,
    penonton: infoVideo.viewCount,
    publish: filterTime(infoVideo.publishDate),
    subcriber: infoVideo.author.subscriber_count,
  };

  return IBotYoutube;
}

export async function IBotMp3(message, url, option) {
  try {
    let informationVideo = {
      information: await IBotMp3Title(url),
      base64: await base64Mp3(url),
    };

    const media = new MessageMedia(
      "audio/mpeg",
      informationVideo.base64,
      `${informationVideo.information.judul}.mp3`
    );
    await message.reply(
      "Nama Channel: \n" +
        informationVideo.information.namaBand +
        "\n\n" +
        "Judul: \n" +
        informationVideo.information.judul +
        "\n\n" +
        "Jumlah Ditonton: \n" +
        parseInt(informationVideo.information.penonton, 10).toLocaleString() +
        "\n\n" +
        "Jumlah Subcriber: \n" +
        informationVideo.information.subcriber.toLocaleString() +
        "\n\n" +
        "Di Publikasikan Pada: \n" +
        "Jam: " +
        informationVideo.information.publish.jam +
        "\n" +
        "Tanggal: " +
        informationVideo.information.publish.tanggal
    );

    await message.reply(media, message.from, option);
  } catch (err) {
    await message.reply("Link youtube tidak valid, silahkan periksa kembali!");
  }
}
