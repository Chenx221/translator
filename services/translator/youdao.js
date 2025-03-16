import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// 有道大模型(LLM)翻译仅支持中英双语，这对GalGame玩家而言基本没啥用

class Client {
    static async translate(text, useLLM) {
        try {
            const endpoint = useLLM ? process.env.YOUDAO_LLM_ENDPOINT : process.env.YOUDAO_MT_ENDPOINT;
            const appKey = process.env.YOUDAO_SECRET_ID;
            const appSecret = process.env.YOUDAO_SECRET_KEY;
            const from = process.env.YOUDAO_SOURCE_LANGUAGE;
            const to = process.env.YOUDAO_TARGET_LANGUAGE;

            const salt = uuidv4();
            const curtime = Math.round(new Date().getTime() / 1000);

            let input;
            if (text.length <= 20) {
                input = text;
            } else {
                const startChars = text.substring(0, 10);
                const endChars = text.substring(text.length - 10);
                input = startChars + text.length + endChars;
            }

            const signStr = appKey + input + salt + curtime + appSecret;
            const sign = crypto.createHash('sha256').update(signStr).digest('hex');

            const data = {
                from,
                to,
                appKey,
                salt,
                sign,
                signType: 'v3',
                curtime
            };

            if (useLLM) {
                data.i = text;
                data.q = text;

                // Additional optional parameters for LLM API
                // Uncomment and set these as needed
                // DOC: https://ai.youdao.com/DOCSIRMA/html/trans/api/dmxfy/index.html
                // 注: 有些是要加钱的
                // data.prompt = ''; // Optional prompt for LLM
                // data.streamType = ''; // Stream return type
                // data.handleOption = ''; // Processing mode options
                // data.polishOption = ''; // Polishing options
                // data.expandOption = ''; // Expansion options

                return new Promise((resolve, reject) => {
                    let translationResult = "";
                    let buffer = "";

                    axios({
                        method: 'post',
                        url: endpoint,
                        data,
                        responseType: 'stream',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'text/event-stream'
                        }
                    }).then(response => {
                        response.data.on('data', (chunk) => {
                            buffer += chunk.toString();

                            // 解析 Server-Sent Events (SSE)
                            const events = buffer.split("\n\n");
                            buffer = events.pop();

                            for (const event of events) {
                                const lines = event.split("\n");
                                if (lines.length < 2) continue;

                                const eventType = lines[0].replace("event:", "").trim();
                                const eventData = JSON.parse(lines[1].replace("data:", "").trim());

                                if (eventType === "begin") {
                                    // console.log("Translation started:", eventData);
                                } else if (eventType === "message") {
                                    // console.log("Incremental translation:", eventData.transIncre);
                                    translationResult += eventData.transIncre;
                                } else if (eventType === "end") {
                                    // console.log("Translation completed:", eventData);
                                    resolve(translationResult);
                                } else if (eventType === "error"){
                                    console.error("Translation error:", eventData);
                                    reject(new Error(eventData));
                                }
                            }
                        });

                        response.data.on('end', () => {
                            resolve(translationResult);
                        });

                        response.data.on('error', reject);
                    }).catch(reject);
                });
            } else {
                data.q = text;

                const response = await axios({
                    method: 'post',
                    url: endpoint,
                    data: new URLSearchParams(data).toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                return response.data;
            }
        } catch (error) {
            console.error('ERROR', error.message);
            throw error;
        }
    }
}

export default Client;