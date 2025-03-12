const tencentcloud = require("tencentcloud-sdk-nodejs-tmt");
const TmtClient = tencentcloud.tmt.v20180321.Client;

class Client {
    static client = null;

    static createClient() {
        if (!Client.client) {
            const clientConfig = {
                credential: {
                    secretId: process.env.TENCENT_SECRET_ID,
                    secretKey: process.env.TENCENT_SECRET_KEY
                },
                region: process.env.TENCENT_MT_REGION,
                profile: {
                    httpProfile: {
                        endpoint: process.env.TENCENT_MT_ENDPOINT,
                    },
                },
            };
            Client.client = new TmtClient(clientConfig);
        }
        return Client.client;
    }

    static async translate(text) {
        const params = {
            "SourceText": text,
            "Source": process.env.TENCENT_SOURCE_LANGUAGE,
            "Target": process.env.TENCENT_TARGET_LANGUAGE,
            "ProjectId": parseInt(process.env.TENCENT_PROJECT_ID)
        };
        let client = Client.createClient();
        try {
            return await client.TextTranslate(params);
        } catch (err) {
            console.error(`${err.code} ${err.message} (${err.requestId})`);
            throw err;
        }
    }
}

module.exports = Client;