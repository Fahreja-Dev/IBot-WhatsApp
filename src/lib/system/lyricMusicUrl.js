import axios from "axios";
import { manageBot } from "../../config.js";

function month(number) {
    const month = {
        1: "Januari",
        2: "Februari",
        3: "Maret",
        4: "April",
        5: "Mei",
        6: "Juni",
        7: "Juli",
        8: "Agustus",
        9: "September",
        10: "Oktober",
        11: "November",
        12: "Desember"
    }

    return month[number]
}

async function getImage(url) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer'
    })

    return response.data.toString("base64")
}

export async function lyricMusicUrl(user) {
    try {
        const url = `https://api.genius.com/search?q=${encodeURIComponent(user)}`
        const response = await axios({
            url,
            method: "GET",
            headers: { "Authorization": "Bearer " + manageBot.accessTokenLyricMusic }
        })

        if (response.data.meta.status === 200) {
            if (response.data.response.hits[0] !== undefined) {

                const information = {
                    groupMusic: response.data.response.hits[0].result.primary_artist.name,
                    title: response.data.response.hits[0].result.title,
                    rilis: `${response.data.response.hits[0].result.release_date_components.day}-${month(response.data.response.hits[0].result.release_date_components.month)}-${response.data.response.hits[0].result.release_date_components.year}`,
                    lyric: response.data.response.hits[0].result.url,
                    image: await getImage(response.data.response.hits[0].result.song_art_image_url)
                }

                return information
            } else {
                return false
            }
        } else {
            console.log("Gagal melakukan scraping!")
        }
    } catch (err) {
        console.log(`Error: ${error}`)
    }
}