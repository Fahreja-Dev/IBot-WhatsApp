import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import stream from "stream";
import messageMedia from "whatsapp-web.js";

const { MessageMedia } = messageMedia;
const Stream = stream;
const Crypto = crypto;

export async function videoSticker(media, message, option) {
  try {
    if (!media.mimetype.includes("video"))
      throw new Error("media is not a video");
    const videoType = media.mimetype.split("/")[1];
    const tempFile = path.join(
      os.tmpdir(),
      `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
    );
    const stream = new Stream.Readable();
    const buffer = Buffer.from(
      media.data.replace(`data:${media.mimetype};base64,`, ""),
      "base64"
    );
    stream.push(buffer);
    stream.push(null);
    const x = await new Promise((resolve, reject) => {
      ffmpeg(stream)
        .inputFormat(videoType)
        .on("error", reject)
        .on("end", () => resolve(true))
        .addOutputOptions([
          "-vcodec",
          "libwebp",
          "-vf",
          "scale='iw*min(300/iw,300/ih)':'ih*min(300/iw,300/ih)',format=rgba,pad=300:300:'(300-iw)/2':'(300-ih)/2':'#00000000',setsar=1,fps=10",
          "-loop",
          "0",
          "-ss",
          "00:00:00.0",
          "-t",
          "00:00:09.0",
          "-preset",
          "default",
          "-an",
          "-vsync",
          "0",
          "-s",
          "512:512",
        ])
        .toFormat("webp")
        .save(tempFile);
    });
    const data = fs.readFileSync(tempFile, "base64");
    fs.unlinkSync(tempFile);

    const mediaSticker = new MessageMedia("image/webp", data);

    await message.reply(mediaSticker, message.from, option);
  } catch (err) {
    await message.reply(
      "Terjadi kesalahan saat proses convert, silahkan coba lagi!"
    );
  }
}
