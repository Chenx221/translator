const axios = require('axios');

class Client {
    static accessToken = null;

    // https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjhhu
    // According to the documentation, the access_token is valid for 30 days from creation
    // so there is no need to check for expiration (unless I want to store the access_token in .env).

    static async getAccessToken() {
        if (!Client.accessToken) {
            const AK = process.env.BAIDU_API_KEY;
            const SK = process.env.BAIDU_SECRET_KEY;
            let options = {
                'method': 'POST',
                'url': 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK + '&client_secret=' + SK,
            }
            try {
                const response = await axios(options);
                Client.accessToken = response.data.access_token;
            } catch (error) {
                console.error(error.message);
                throw new Error('Failed to get access token: ' + error.message);
            }
        }
        return Client.accessToken;
    }

    static async translate(text) {
        let options = {
            'method': 'POST',
            'url': `${process.env.BAIDU_MT_ENDPOINT}?access_token=` + await Client.getAccessToken(),
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify({
                "from": process.env.BAIDU_SOURCE_LANGUAGE,
                "to": process.env.BAIDU_TARGET_LANGUAGE,
                "q": text
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

module.exports = Client;