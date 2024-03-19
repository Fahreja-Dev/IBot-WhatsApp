import messageMedia from "whatsapp-web.js"
import axios from "axios";
import { proxy } from "../../proxy.js"
import { socksProxy } from "./socksProxy.js"

const { MessageMedia } = messageMedia

async function filterElement(string) {
    return new Promise((resolve, reject) => {
        const matchMerger = (lyric) => {
            let result = ''
            for (const data of lyric) {
                result += data
            }
            return result
        }

        const result = matchMerger(string).replaceAll(/<a.+?>|<\/a>|&#x27;|data-lyrics-container="true" class="Lyrics__Container-sc-1ynbvzw-1 kUgSbL">|<\/div>/g, '')

        resolve(result)

        reject(`Error: ${error}`)
    })
}

async function filterSpan(string) {
    return new Promise((resolve, reject) => {
        const result = string.replaceAll(/<span.+?>|<\/span>/g, '')
        resolve(result)
        reject(`Error: ${error}`)
    })
}

async function filterBr(string) {
    return new Promise((resolve, reject) => {
        const result = string.replaceAll(/<br\/><br\/>/g, '\n\n')
        const result2 = result.replaceAll(/<br\/>/g, '\n')
        const result3 = result2.replaceAll(/\[/g, '*[')
        const result4 = result3.replaceAll(/\]/g, ']*')

        resolve(result4)
        reject(`Error: ${error}`)
    })
}

async function filterChildElement(string) {
    return new Promise((resolve, reject) => {
        const result = string.replaceAll(/<i>|<\/i>|<b>|<\/b>|.+&quot;.+/g, '')

        resolve(result)
        reject(`Error: ${error}`)
    })
}

async function searchLyricMusic(string) {
    const lyric = /data-lyrics-container="true".+?<\/div>/;
    const search = new RegExp(lyric, "g")
    const matchLyric = string.match(search)

    const filter = await filterChildElement(
        await filterBr(
            await filterSpan(
                await filterElement((matchLyric))
            )
        )
    )

    return filter
}

export async function lyricMusic(message, object) {

    if (object) {
        try {
            const client = axios.create(socksProxy(proxy, object.lyric));
            const page = await client({ method: "GET" })
            const lyric = await searchLyricMusic(page.data)
            const media = new MessageMedia("image/jpeg", object.image)

            await message.reply(media, message.from, {
                caption:
                    "> Grup Musik : " + object.groupMusic + "\n" +
                    "> Judul : " + object.title + "\n" +
                    "> Dirilis : " + object.rilis + "\n\n" +
                    "―――――[ LIRIK ]―――――\n" +
                    lyric +
                    "\n\n――――――――――――――"
            })
        } catch (err) {
            await message.reply("Fitur Lyric Music tidak dapat di akses, silahkan hubungi owner!")
        }
    } else {
        await message.reply("Lirik lagu tidak ditemukan!")
    }
}