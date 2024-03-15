import ytdlPkg from "ytdl-core";
import fs from "fs"
import messageMedia from "whatsapp-web.js"
import stream from "stream";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import os from "os";
import crypto from "crypto";

const Stream = stream;
const { MessageMedia } = messageMedia
const ytdl = ytdlPkg;
const Crypto = crypto;

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
            const bufferVideo = Buffer.concat(dataStream);
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
        subcriber: parseInt(infoVideo.author.subscriber_count),
        durasi: parseInt(infoVideo.lengthSeconds)
    };

    return IBotYoutube;
}

async function createFile(url, file) {
    const audio = {
        nameFile: file,
        base64: await base64Mp3(url)
    };

    const streams = new Stream.Readable()
    streams.push(audio.base64);
    streams.push(null);

    // Mengembalikan Promise yang diselesaikan setelah FFmpeg selesai menyimpan file
    return new Promise((resolve, reject) => {
        ffmpeg(streams)
            .save(audio.nameFile)
            .on('end', () => resolve(audio.nameFile)) // Resolve dengan nama file setelah selesai
            .on('error', (err) => reject(err)); // Reject Promise jika terjadi error
    })
}

export async function ytVoice(message, url, option) {
    try {
        const audioName = path.join(
            os.tmpdir(),
            `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp3`
        )

        const information = {
            createFile: (await createFile(url, audioName)),
            video: await IBotMp3Title(url)
        }
        if (!(information.video.durasi >= 3360)) {
            const mp3 = information.createFile; // Menunggu sampai file selesai dibuat
            const file = fs.readFileSync(mp3).toString("base64");
            const media = new MessageMedia("audio/mpeg", file);

            await message.reply(
                "Nama Channel: \n" +
                information.video.namaBand +
                "\n\n" +
                "Judul: \n" +
                information.video.judul +
                "\n\n" +
                "Jumlah Ditonton: \n" +
                parseInt(information.video.penonton, 10).toLocaleString() +
                "\n\n" +
                "Jumlah Subcriber: \n" +
                information.video.subcriber.toLocaleString() +
                "\n\n" +
                "Di Publikasikan Pada: \n" +
                "Jam: " +
                information.video.publish.jam +
                "\n" +
                "Tanggal: " +
                information.video.publish.tanggal
            );

            await message.reply(media, message.from, option);

            fs.unlinkSync(audioName)
        } else {
            await message.reply("Batas durasi maksimal 56 menit!");
        }
    } catch (error) {
        await message.reply("Gagal membuat audio, silahkan coba lagi nanti!")
    }
}