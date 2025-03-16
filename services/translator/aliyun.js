import alimt20181012 from '@alicloud/alimt20181012';
import OpenApi from '@alicloud/openapi-client';
import Util from '@alicloud/tea-util';

class Client {
    static client = null;

    static createClient() {
        if (!Client.client) {
            let config = new OpenApi.Config({
                accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
                accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
            });
            config.endpoint = process.env.ALIYUN_MT_ENDPOINT;
            Client.client = new alimt20181012.default(config);
        }
        return Client.client;
    }

    static async translate(text, isPro) {
        let client = Client.createClient();
        let runtime = new Util.RuntimeOptions({});
        const targetLanguage = process.env.ALIYUN_TARGET_LANGUAGE;
        const sourceLanguage = process.env.ALIYUN_SOURCE_LANGUAGE;
        try {
            if (isPro) {
                let translateRequest = new alimt20181012.TranslateRequest({
                    formatType: 'text',
                    targetLanguage: targetLanguage,
                    sourceLanguage: sourceLanguage,
                    sourceText: text,
                    scene: 'social',
                });
                return await client.translateWithOptions(translateRequest, runtime);
            } else {
                let translateGeneralRequest = new alimt20181012.TranslateGeneralRequest({
                    formatType: 'text',
                    targetLanguage: targetLanguage,
                    sourceLanguage: sourceLanguage,
                    sourceText: text,
                    scene: 'general',
                });
                return await client.translateGeneralWithOptions(translateGeneralRequest, runtime);
            }
        } catch (error) {
            console.error(error.message); console.error(error.data["Recommend"]);
            return { error: error.code, statusCode: error.statusCode };
        }
    }
}

export default Client;