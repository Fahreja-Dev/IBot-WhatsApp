import { createApi } from 'unsplash-js';
import { manageBot } from "../../config.js";
import request from 'request';
import messageMedia from "whatsapp-web.js";
const { MessageMedia } = messageMedia;

function randomNumber(min, max) {
    const minCeil = Math.ceil(min)
    const maxFloor = Math.floor(max)

    const output = Math.floor(Math.random() * (maxFloor - minCeil) + minCeil)


    return output
}

export async function searchImagesUnsplash(message) {
    try {
        const unsplash = createApi({
            accessKey: manageBot.accessKeyUnsplash
        })

        let search = await unsplash.search.getPhotos({
            query: message,
        })

        const result = search.response.results[randomNumber(0, 4)]

        const object = {
            tagTitle: result.tags[0].title,
            description: result.alt_description,
            urlImage: result.urls.full
        }

        return object
    } catch (err) {
        return false
    }

}

export async function requestUrlUnsplash(message, searchImage) {

    if (searchImage) {


        const requestUrl = request.defaults({ encoding: null });

        const search = await searchImage;

        requestUrl.get(search.urlImage, (error, response, body) => {
            if (!error && response.statusCode == 200) {

                const object = {
                    tagTitle: search.tagTitle,
                    description: search.description,
                    mimeType: response.headers["content-type"],
                    data: Buffer.from(body).toString('base64')
                }
                const media = new MessageMedia(object.mimeType, object.data)
                message.reply(media, message.from, {
                    caption:
                        "Tag Judul: " + object.tagTitle + "\n\n" +
                        "Deskripsi: " + object.description
                });

            } else {
                message.reply("Gagal mencari image, silahkan coba lagi!")
            }
        })
    } else {
        message.reply("Fitur belum aktif!")
    }

}