import {Ollama} from 'ollama'

class Client {
    static ollama = null;

    static createClient() {
        if (!Client.ollama) {
            Client.ollama = new Ollama({host: process.env.OLLAMA_HOST})
        }
        return Client.ollama;
    }

    static async translate(text) {
        let client = this.createClient();
        let enabledModels = process.env.OLLAMA_MODEL.split(',');
        // Q: Why not use OLLAMA_MODELS?
        // A: The device's system environment variables might conflict with it. :(

        const promises = enabledModels.map(async (model) => {
            try {
                let completion;
                if (model.startsWith('hf.co/SakuraLLM')) {
                    completion = await client.chat({
                        model,
                        messages: [
                            {
                                role: "user",
                                content: text
                            }
                        ],
                        stream: false,
                        keep_alive: '10m'
                    });
                } else {
                    completion = await client.chat({
                        model,
                        messages: [
                            {
                                role: "system",
                                content: process.env.OLLAMA_PROMPT || process.env.GLOBAL_AI_PROMPT
                            },
                            {
                                role: "user",
                                content: JSON.stringify({
                                    text: text,
                                    from: process.env.OLLAMA_SOURCE_LANGUAGE,
                                    to: process.env.OLLAMA_TARGET_LANGUAGE
                                })
                            }
                        ],
                        format: 'json',
                        stream: false,
                        keep_alive: '10m'
                    });
                }

                return {
                    model,
                    content: completion.message.content
                };
            } catch (error) {
                console.error(`Error with model ${model}:`, error.message);
                return {
                    model,
                    error: error.message
                };
            }
        });

        return Promise.all(promises);
    }

    static async getModels() {
        try {
            let client = this.createClient();
            const response = await client.list();
            return response.models;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

export default Client;