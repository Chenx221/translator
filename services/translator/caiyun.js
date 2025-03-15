const axios = require('axios');
const uuid = require('uuid');

class Client {
    static async translate(text) {
        let options = {
            'method': 'POST',
            'url': process.env.CAIYUN_MT_ENDPOINT,
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-authorization': `token ${process.env.CAIYUN_TOKEN}`
            },
            data: JSON.stringify({
                "source": text,
                "trans_type": process.env.CAIYUN_FROM_TO,
                // ↓ Who knows? The development documentation doesn't mention it at all.
                "request_id": uuid.v4(),
                "detect": process.env.CAIYUN_FROM_TO.substring(0, 5) === 'auto2'
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