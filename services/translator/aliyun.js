import alimt20181012 from '@alicloud/alimt20181012';
import OpenApi from '@alicloud/openapi-client';
import Util from '@alicloud/tea-util';
import axios from "axios";

class Client {
    static client = null;
    static csrfToken = null;

    static createClient() {
        if (!Client.client) {
            Client.client = new alimt20181012.default(new OpenApi.Config({
                accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
                accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
                endpoint: process.env.ALIYUN_MT_ENDPOINT,
            }));
        }
        return Client.client;
    }

    static async getCsrfToken(force = false) {
        if ((!Client.csrfToken) || force) {
            try {
                const response = await axios.get('https://translate.alibaba.com/api/translate/csrftoken');
                if (response.data && response.data.token) {
                    Client.csrfToken = response.data.token;
                } else {
                    throw new Error('CSRF token not found in response');
                }
            } catch (error) {
                console.error('Error fetching CSRF:', error);
                return null;
            }
        }
        return Client.csrfToken;
    }

    static async translate(text, version) {
        const targetLanguage = process.env.ALIYUN_TARGET_LANGUAGE;
        const sourceLanguage = process.env.ALIYUN_SOURCE_LANGUAGE;
        try {
            switch (version) {
                case 'pro': {
                    let client = Client.createClient();
                    let runtime = new Util.RuntimeOptions({});
                    let translateRequest = new alimt20181012.TranslateRequest({
                        formatType: 'text',
                        targetLanguage: targetLanguage,
                        sourceLanguage: sourceLanguage,
                        sourceText: text,
                        scene: 'social',
                    });
                    return await client.translateWithOptions(translateRequest, runtime);
                }
                case 'general': {
                    let client = Client.createClient();
                    let runtime = new Util.RuntimeOptions({});
                    let translateGeneralRequest = new alimt20181012.TranslateGeneralRequest({
                        formatType: 'text',
                        targetLanguage: targetLanguage,
                        sourceLanguage: sourceLanguage,
                        sourceText: text,
                        scene: 'general',
                    });
                    return await client.translateGeneralWithOptions(translateGeneralRequest, runtime);
                }
                case 'free': {
                    let csrfToken = await Client.getCsrfToken();
                    if (!csrfToken) {
                        console.error('Failed to get CSRF token');
                        return;
                    }

                    async function fetchTranslation(retry = false) {
                        try {
                            const response = await axios.post(
                                'https://translate.alibaba.com/api/translate/text',
                                new URLSearchParams({
                                    srcLang: sourceLanguage,
                                    tgtLang: targetLanguage,
                                    domain: 'general',
                                    query: text,
                                    _csrf: csrfToken
                                }),
                                {
                                    headers: {
                                        'accept': 'application/json',
                                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Translator/0.0.1',
                                        'content-type': 'application/x-www-form-urlencoded',
                                    },
                                    maxRedirects: 0
                                }
                            );
                            return response.data;
                        } catch (error) {
                            if (error.response && error.response.status === 302 && !retry) {
                                csrfToken = await Client.getCsrfToken(true);
                                return fetchTranslation(true);
                            }
                            throw error;
                        }
                    }

                    return await fetchTranslation();
                }
            }
        } catch (error) {
            console.error(error.message);
            if (error.data["Recommend"] !== undefined) console.error(error.data["Recommend"]);
            return {error: error.code, statusCode: error.statusCode};
        }
    }
}

export default Client;