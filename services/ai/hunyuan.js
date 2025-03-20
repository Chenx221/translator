// If the two Tencent Hunyuan translation models support calling via the OpenAI SDK
// I will remove this code.
import tencentcloud from "tencentcloud-sdk-nodejs-hunyuan";

const HunyuanClient = tencentcloud.hunyuan.v20230901.Client;

class Client {
    static client = null;

    static createClient() {
        if (!Client.client) {
            const clientConfig = {
                credential: {
                    secretId: process.env.TENCENT_AI_SECRET_ID,
                    secretKey: process.env.TENCENT_AI_SECRET_KEY
                },
                region: "",
                profile: {
                    httpProfile: {
                        endpoint: process.env.TENCENT_AI_ENDPOINT2,
                    },
                },
            };
            Client.client = new HunyuanClient(clientConfig);
        }
        return Client.client;
    }

    static async translate(text) {
        const params = {
            "Model": process.env.TENCENT_AI_MODEL,
            "Stream": false,
            "Text": text,
            "Source": process.env.TENCENT_AI_SOURCE_LANGUAGE,
            "Target": process.env.TENCENT_AI_TARGET_LANGUAGE
        };
        let client = Client.createClient();
        try {
            return await client.ChatTranslations(params);
        } catch (err) {
            console.error(`${err.code} ${err.message} (${err.requestId})`);
            throw err;
        }
    }
}

export default Client;