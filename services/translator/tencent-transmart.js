import axios from "axios";
import {v4 as uuidv4} from 'uuid';

class Client {
    static clientKey = null;

    static async getClientKey(force = false) {
        if ((!Client.clientKey) || force) {
            // 时间信息实际不检查
            Client.clientKey = (`browser-chrome-134.0.0-Windows_10-${uuidv4()}-${new Date().getTime().toString()}`).slice(0, 100);
        }
        return Client.clientKey;
    }

    static async translate(text) {
        const targetLanguage = process.env.TENCENT_TS_TARGET_LANGUAGE;
        const sourceLanguage = process.env.TENCENT_TS_SOURCE_LANGUAGE;
        let clientKey = await Client.getClientKey();

        async function fetchTranslation(retry = false) {
            try {
                const response = await axios.post(
                    'https://transmart.qq.com/api/imt',
                    {
                        header: {
                            fn: "auto_translation",
                            session: "",
                            client_key: clientKey,
                            user: ""
                        },
                        type: "plain",
                        model_category: "normal",
                        text_domain: "",
                        source: {
                            lang: sourceLanguage,
                            text_list: [text]
                        },
                        target: {
                            lang: targetLanguage
                        }
                    },
                    {
                        headers: {
                            'accept': 'application/json',
                            'content-type': 'application/json',
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 translator/0.0.1'
                        }
                    }
                );
                return response.data;
            } catch (error) {
                if (error.response && !retry) {
                    clientKey = await Client.getClientKey(true);
                    return fetchTranslation(true);
                }
                throw error;
            }
        }

        return await fetchTranslation();
    }
}

export default Client;