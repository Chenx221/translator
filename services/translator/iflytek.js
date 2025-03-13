const crypto = require('crypto');
const axios = require('axios');

class Client {
    static async translate(text, version) {
        try {
            let endpoint;
            if (version === 0) {
                endpoint = process.env.IFLYTEK_MT_ENDPOINT;
            } else if (version === 1) {
                endpoint = process.env.IFLYTEK_MT_NEW_ENDPOINT;
            } else if (version === 2) {
                endpoint = process.env.IFLYTEK_MT_NIUTRANS_ENDPOINT;
            } else {
                throw new Error("Invalid version");
            }
            const url = new URL(endpoint);
            const host = url.hostname;
            const uri = url.pathname;
            const date = new Date().toUTCString();

            if (version === 0 || version === 2) { // xftrans-general, xftrans-niutrans
                const postBody = this.getPostBody(text,
                    process.env.IFLYTEK_SOURCE_LANGUAGE,
                    process.env.IFLYTEK_TARGET_LANGUAGE);
                const digest = this.getDigest(postBody);

                const response = await axios.post(endpoint, postBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json,version=1.0',
                        'Host': host,
                        'Date': date,
                        'Digest': digest,
                        'Authorization': this.getAuthStr(date, digest, host, uri)
                    }
                });

                const {data} = response;

                if (data.code !== 0) {
                    throw new Error(`Error code: ${data.code}, message: ${data.message}`);
                }

                return {
                    TargetText: data.data.result.trans_result.dst,
                    Source: data.data.result.from,
                    Target: data.data.result.to,
                    RequestId: data.sid
                };
            } else { // xftrans-new
                const authorization = this.getAuthStr(date, null, host, uri);
                const url = `${endpoint}?authorization=${authorization}&host=${encodeURIComponent(host)}&date=${encodeURIComponent(date)}`;
                const postBody = this.getPostBody2(text,
                    process.env.IFLYTEK_SOURCE_LANGUAGE,
                    process.env.IFLYTEK_TARGET_LANGUAGE);
                const response = await axios.post(url, postBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json,version=1.0'
                    }
                });
                const {data} = response;
                const {header, payload} = data;

                if (header.code !== 0) {
                    throw new Error(`Error code: ${header.code}, message: ${header.message}`);
                }
                const decodedText = Buffer.from(payload.result.text, 'base64').toString();
                const translationResult = JSON.parse(decodedText);
                return {
                    TargetText: translationResult.trans_result.dst,
                    Source: translationResult.from,
                    Target: translationResult.to,
                    RequestId: header.sid
                };
            }
        } catch (err) {
            console.error(`iFlytek translation error: ${err.message}. ${err.response.data.message}`);
            throw err;
        }
    }

    static getPostBody(text, from, to) {
        return {
            common: {
                app_id: process.env.IFLYTEK_APP_ID
            },
            business: {
                from: from,
                to: to
            },
            data: {
                text: Buffer.from(text).toString('base64')
            }
        };
    }

    static getPostBody2(text, from, to) {
        return {
            header: {
                app_id: process.env.IFLYTEK_APP_ID,
                status: 3
            },
            parameter: {
                its: {
                    from: from,
                    to: to,
                    result: {}
                }
            },
            payload: {
                input_data: {
                    encoding: "utf8",
                    status: 3,
                    text: Buffer.from(text).toString('base64')
                }
            }
        };
    }

    static getDigest(body) {
        return 'SHA-256=' + crypto.createHash('sha256').update(JSON.stringify(body)).digest('base64');
    }

    static getAuthStr(date, digest, host, uri) {
        let signatureOrigin;
        if (digest === null) {
            signatureOrigin = `host: ${host}\ndate: ${date}\nPOST ${uri} HTTP/1.1`;
            const signature = crypto.createHmac('sha256', process.env.IFLYTEK_API_SECRET)
                .update(signatureOrigin).digest('base64');
            const authString = `api_key="${process.env.IFLYTEK_API_KEY}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
            return Buffer.from(authString).toString('base64');
        } else {
            signatureOrigin = `host: ${host}\ndate: ${date}\nPOST ${uri} HTTP/1.1\ndigest: ${digest}`;
            const signature = crypto.createHmac('sha256', process.env.IFLYTEK_API_SECRET)
                .update(signatureOrigin).digest('base64');
            return `api_key="${process.env.IFLYTEK_API_KEY}", algorithm="hmac-sha256", headers="host date request-line digest", signature="${signature}"`;
        }


    }
}

module.exports = Client;