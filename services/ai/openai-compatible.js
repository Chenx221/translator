import OpenAI from 'openai';

// All other AI providers compatible with the OpenAI standard can use this.

class Client {
    static createClient(baseURL, apiKey) {
        return new OpenAI({
            baseURL: baseURL,
            apiKey: apiKey
        });
    }

    static async translate({
                               baseURL,
                               apiKey,
                               text,
                               from,
                               to,
                               model,
                               prompt,
                               specificMessage = null,
                               translation_options = null
                           }) {
        let client = this.createClient(baseURL, apiKey);
        let params = {
            messages: specificMessage ?? [
                {
                    role: "system", content: prompt
                },
                {
                    role: "user", content: JSON.stringify({
                        text: text,
                        from: from,
                        to: to
                    })
                }
            ],
            model: model,
        };
        if (translation_options) {
            // @ts-expect-error aliyun specific
            params.translation_options = translation_options;
        }

        const completion = await client.chat.completions.create(params);
        return completion.choices[0].message.content;
    }

    static async getModels(baseURL, apiKey) {
        try {
            let client = this.createClient(baseURL, apiKey);
            const response = await client.models.list();
            return response.data;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

export default Client;