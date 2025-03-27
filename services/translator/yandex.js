import axios from 'axios';

class Client {
    static srv = 'tr-touch'; // or tr-text / touch
    static sid= '';
    static dt;

    static async translate(text,version) {
        switch(version) {
            case 0: // free web api
                const params = new URLSearchParams({
                    id: `${await Client.getSid()}-0-0`,
                    srv: Client.srv,
                    source_lang: process.env.YANDEX_SOURCE_LANGUAGE,
                    target_lang: process.env.YANDEX_TARGET_LANGUAGE,
                    reason: 'paste',
                    format: 'text',
                    strategy: '', //
                    disable_cache: '',
                    ajax: 1
                    //yu:
                });
                const formData = new URLSearchParams({
                    text,
                    options: 0 //???
                });
                let options = {
                    'method': 'POST',
                    'url': `https://translate.yandex.net/api/v1/tr.json/translate?${params.toString()}`,
                    'headers': {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'accept': '*/*',
                        'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
                        'cache-control': 'no-cache',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
                        'origin': 'https://translate.yandex.com',
                        'referer': 'https://translate.yandex.com/',
                        'x-retpath-y': 'https://translate.yandex.com',
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
                break;
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

    static async getSid() {
        const currentTime = Date.now() / 1000;
        if (Client.sid === '' || !Client.dt || currentTime >= Client.dt) {
            try {
                const response = await axios({
                    method: 'POST',
                    url: `https://translate.yandex.com/props/api/v1.0/sessions?srv=${Client.srv}`,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
                        'Accept': 'application/json',
                        'Referer': 'https://translate.yandex.com/',
                    }
                });

                if (response.data && response.data.session) {
                    Client.sid = response.data.session.id;
                    Client.dt = response.data.session.creationTimestamp+response.data.session.maxAge;
                    console.log('New Yandex session ID obtained:', Client.sid);
                }
            } catch (error) {
                console.error('Error getting Yandex session ID:', error.message);
                throw error;
            }
        }
        return Client.sid;
    }
}


export default Client;