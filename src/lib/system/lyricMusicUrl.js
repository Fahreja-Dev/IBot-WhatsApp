import request from "request";
import { manageBot } from "../../config.js";

function IBotLyricUrl(path) {
    const search = new RegExp(/\"url\":.+?,/, "g")
    const filterMatch = path.match(search)
    return filterMatch.map((value) => {
        const mapSearch = new RegExp(/artists|instrumental|edm|acoustic|tropical|holiday|Genius/, "g")
        const mapMatch = value.match(mapSearch)
        let result = ''

        if (!(mapMatch)) {
            result += value
        }
        return result

    })
}

function IBotLyricTitle(url) {
    const search = new RegExp(/\"title\":.+?,/, "g")
    const filterMatch = url.match(search)

    return filterMatch.map((value) => {
        const mapSearch = new RegExp(/Discography|Álbumes|Instrumental|EDM Remix|Acoustic Remix|Tropical Remix|Holiday Remix|Album|Collection|Live|Release/, "g")
        const mapMatch = value.match(mapSearch)
        let result = ''

        if (!(mapMatch)) {
            result += value
        }
        return result
    })
}

function IBotLyricGroupMusic(string) {
    const search = new RegExp(/\"artist_names\":.+?,/, "g")
    const filterMatch = string.match(search)

    return filterMatch[0].replace(/\"artist_names\":\"|\",/g, '')
}

function IBotLyricUrlImage(string) {
    const search = new RegExp(/\"song_art_image_url\":.+?,/)
    const filterMatch = string.match(search)

    const uriImage = filterMatch[0].replace(/\"song_art_image_url\":\"|\",/g, '')
    const requestUrl = request.defaults({ encoding: null });
    return new Promise((resolve, reject) => {
        requestUrl.get(uriImage, (error, response, body) => {
            if (response.toJSON().statusCode === 200) {
                resolve(Buffer.from(body).toString("base64"))
            }
            reject(`Error: ${error}`)
        })
    })

}

function validation(url, name) {
    for (const data of url) {
        if (data.length > 0) {
            const search = new RegExp(`"${name}":"|",`, "g")
            return data.replace(search, '')
        }
    }
}

export async function lyricMusicUrl(user) {
    return new Promise((resolve, reject) => {
        request.get(`https://api.genius.com/search?q=${encodeURIComponent(user)}`, {
            auth: {
                bearer: manageBot.accessTokenLyricMusic
            }
        }, async (error, response, body) => {

            if (response.toJSON().statusCode === 200) {
                if (body.length >= 47) {
                    const information = {
                        groupMusic: IBotLyricGroupMusic(body),
                        title: validation(IBotLyricTitle(body), "title"),
                        uriLyric: validation(IBotLyricUrl(body), "url"),
                        imageBase64: await IBotLyricUrlImage(body)
                    }
                    resolve(information)
                } else {
                    resolve(false)
                }


            }

            reject(`Error: ${error}`)
        })
    })

}