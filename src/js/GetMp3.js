import axios from "axios";
import {showError} from "@/js/Alert";

export async function getMp3(word) {
    const rs = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .catch(err => {
            showError(err)
        })
    if (!rs) return ''
    for (let i = 0; i <= 10; i++) {
        let audio = rs.data[0]?.phonetics[i]?.audio
        if (audio) {
            return audio
        }
    }
}
