import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

class Client {
    static sid= '';
    static count = 0;

    static async translate(text,version) {
        switch(version) {
            case 0: // free android api
                const params = new URLSearchParams({
                    id: `${uuidv4().replace(/-/g, '')}-${Client.count++}-0`,
                    srv: 'android'
                });
                const formData = new URLSearchParams({
                    text,
                    source_lang: process.env.YANDEX_SOURCE_LANGUAGE,
                    target_lang: process.env.YANDEX_TARGET_LANGUAGE,
                });
                let options = {
                    'method': 'POST',
                    'url': `https://translate.yandex.net/api/v1/tr.json/translate?${params.toString()}`,
                    'headers': {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': 'ru.yandex.translate/88.2.30880200 (Vivo V1965a; Android 10)',
                        // Q: Why use this UA?
                        // A: ...Actually, it's because I'm lazy.

                        'Host': 'translate.yandex.net',
                        'Accept-Encoding': 'gzip'
                    },
                    data: formData
                };
                try {
                    const response = await axios(options);
                    return response.data;
                } catch (error) {
                    console.error(error.message);
                    throw error;
                }
            case 1: // paid api
                try {
                    const response = await axios({
                        'method': 'POST',
                        'url': 'https://translate.api.cloud.yandex.net/translate/v2/translate',
                        'headers': {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.YANDEX_TOKEN}`
                        },
                        data: JSON.stringify({
                            "folderId": process.env.YANDEX_FOLDER_ID,
                            "sourceLanguageCode": process.env.YANDEX_SOURCE_LANGUAGE,
                            "targetLanguageCode": process.env.YANDEX_TARGET_LANGUAGE,
                            "texts": [text]
                        })
                    });
                    return response.data;
                } catch (error) {
                    console.error(error.message);
                    throw error;
                }
            case 2: // free browser api (Yandex Browser's built-in translation API)
            {
                const params = new URLSearchParams({
                    translateMode: 'auto', //context/balloon/auto
                    id: `${Client.generateSid()}-0-0`,
                    srv: 'yabrowser',
                    text: text,
                    lang: `${process.env.YANDEX_SOURCE_LANGUAGE}-${process.env.YANDEX_TARGET_LANGUAGE}`,
                    format: 'html',
                    options: '2',
                    version: '8.2'
                });

                let options = {
                    'method': 'GET',
                    'url': `https://browser.translate.yandex.net/api/v1/tr.json/translate?${params.toString()}`,
                    'headers': {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 YaBrowser/25.2.0.0 Safari/537.36',
                        'Accept-Encoding': 'gzip, deflate, br, zstd',
                    }
                };
                try {
                    const response = await axios(options);
                    return response.data;
                } catch (error) {
                    console.error(error.message);
                    throw error;
                }
            }
        }
    }

    static generateSid() {
        let timePart = Date.now().toString(16);
        let randomPart = Array.from(crypto.getRandomValues(new Uint8Array(8)))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
        return (timePart + randomPart).slice(0, 16);
    }

}


export default Client;