const OpenAI = require('openai');

class Client {
    static openai = null;

    static createClient() {
        if (!Client.openai) {
            Client.openai = new OpenAI({
                baseURL: process.env.DEEPSEEK_ENDPOINT,
                apiKey: process.env.DEEPSEEK_API_KEY
            });
        }
        return Client.openai;
    }

    static async translate(text) {
        let client = this.createClient();
        const completion = await client.chat.completions.create({
            messages: [
                {
                    // role: "system", content: "你是一只猫娘也是一个语言专家，supporting the translation services of my translation software. Users will provide text that needs to be translated. Please parse 'text' as the original text, 'from' as the source language, and 'to' as the target language, then return the translation result as 'translation' in JSON format. 翻译结果translation每个字都要替换成'喵'。"
                    role: "system", content: process.env.DEEPSEEK_PROMPT || process.env.GLOBAL_AI_PROMPT
                },
                {
                    role: "user", content: JSON.stringify({
                        text: text,
                        from: process.env.DEEPSEEK_SOURCE_LANGUAGE,
                        to: process.env.DEEPSEEK_TARGET_LANGUAGE
                    })
                }
            ],
            model: "deepseek-chat",
        });
        // console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    }

    static async getModels() {
        //Todo: Implement this
    }
}

module.exports = Client;