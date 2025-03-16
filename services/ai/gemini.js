import {GoogleGenAI} from '@google/genai';
import axios from "axios";

class Client {
    static ai = null;

    static createAi() {
        if (!Client.ai) {
            Client.ai = new GoogleGenAI({
                apiKey: process.env.GEMINI_API_KEY
            });
        }
        return Client.ai;
    }

    static async translate(text) {
        let ai = this.createAi();
        const response = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL,
            contents: [
                {
                    role: "system",
                    text: process.env.GEMINI_PROMPT || process.env.GLOBAL_AI_PROMPT
                },
                {
                    role: "user",
                    text: JSON.stringify({
                        text: text,
                        from: process.env.GEMINI_SOURCE_LANGUAGE,
                        to: process.env.GEMINI_TARGET_LANGUAGE
                    })
                }
            ],
            config:{
                responseMimeType: "application/json",
            }
        });
        return response.text;
    }

    static async getModels() {
        let options = {
            'method': 'GET',
            'url': `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
            'headers': {
                'Accept': 'application/json'
            }
        };
        try {
            const response = await axios(options);
            return response.data.models
                .filter(model => model.supportedGenerationMethods.includes("generateContent"))
                .map(model => model.name.replace(/^models\//, ''));
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

export default Client;