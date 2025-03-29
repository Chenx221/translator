import * as deepl from 'deepl-node';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

class Client {
    static client = null;
    static id = uuidv4();

    static createClient() {
        if (!Client.client) {
            Client.client = new deepl.Translator(process.env.DEEPL_API_KEY);
        }
        return Client.client;
    }

    static async translate(text, version) {
        switch (version) {
            case 0: // free apikey
            case 1: // paid apikey
                const translator = Client.createClient();
                const result = await translator.translateText(text, process.env.DEEPL_SOURCE_LANGUAGE||null, process.env.DEEPL_TARGET_LANGUAGE);
                return result.text;
            case 2: // no apikey // not implemented
            {
                let options = {
                    'method': 'POST',
                    'url': `https://www2.deepl.com/jsonrpc`,
                    'headers': {
                        'Host': 'www2.deepl.com',
                        'Referer': 'https://www.deepl.com/',
                        'x-product': 'translator',
                        'x-instance': Client.id,
                        'client-id': Client.id,
                        'User-Agent': 'DeepL/25.12(160) Android 10 (v1965a;aarch64)',
                        'x-app-os-name': 'Android',
                        'x-app-os-version': 15,
                        'x-app-version': '25.12',
                        'x-app-build': '160',
                        'x-app-device': 'v1965a',
                        'x-app-instance-id': Client.id,
                        'Content-Type': 'application/json; charset=utf-8',
                        'Accept-Encoding': 'gzip',
                    },
                    data: JSON.stringify({
                        "id": 1e4 * Math.round(1e4 * Math.random()),
                        "jsonrpc": "2.0",
                        "method": "LMT_handle_jobs",
                        "params": {
                            "jobs": [
                                {
                                    "kind": "alternatives_at_position",
                                    "raw_en_context_after": [],
                                    "raw_en_context_before": [],
                                    "sentences": [
                                        {
                                            "id": 0,
                                            "prefix": "",
                                            "text": text,
                                            "partial_translation": ""
                                        }
                                    ]
                                }
                            ],
                            "commonJobParams": {
                                "mode": "translate",
                                "textType": "plaintext",
                                // "regionalVariant": "en-US",
                                "wasSpoken": false
                            },
                            "lang": {
                                "target_lang": process.env.DEEPL_TARGET_LANGUAGE.toLowerCase(),
                                "source_lang_computed": process.env.DEEPL_SOURCE_LANGUAGE.toLowerCase(),
                                "preference": {
                                    "weight": {},
                                    "default": "default"
                                }
                            },
                            "priority": 1,
                            "timestamp": Date.now()
                        }
                    })
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