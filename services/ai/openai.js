import OpenAI from 'openai';

class Client {
    static openai = null;

    static createClient() {
        if (!Client.openai) {
            Client.openai = new OpenAI({
                baseURL: process.env.OPENAI_ENDPOINT,
                apiKey: process.env.OPENAI_API_KEY
            });
        }
        return Client.openai;
    }

    static async translate(text) {
        let client = this.createClient();
        const completion = await client.chat.completions.create({
            messages: [
                {
                    role: "system", content: process.env.OPENAI_PROMPT || process.env.GLOBAL_AI_PROMPT
                },
                {
                    role: "user", content: JSON.stringify({
                        text: text,
                        from: process.env.OPENAI_SOURCE_LANGUAGE,
                        to: process.env.OPENAI_TARGET_LANGUAGE
                    })
                }
            ],
            model: process.env.OPENAI_MODEL,
        });
        return completion.choices[0].message.content;
    }

    static async getModels() {
        try {
            let client = this.createClient();
            const response = await client.models.list();
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

export default Client;