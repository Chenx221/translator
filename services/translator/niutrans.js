const axios = require('axios');

class Client {
    static async translate(text) {
        let options = {
            'method': 'POST',
            'url': `${process.env.NIUTRANS_MT_ENDPOINT}`,
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: JSON.stringify({
                "apikey": process.env.NIUTRANS_API_KEY,
                "from": process.env.NIUTRANS_SOURCE_LANGUAGE,
                "to": process.env.NIUTRANS_TARGET_LANGUAGE,
                "src_text": text,
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