import OpenAI from 'openai';
import { Application, Request, Response } from 'express';
import { config } from "../config/db.config";

class OpenAIApi {
    constructor(app: Application) {
        const openai = new OpenAI({ apiKey: config.OPEN_AI_API_KEY });

        app.post('/api/openAI/generateRequest', async (req: Request, res: Response) => {
            try {
                console.log('Received request:', req.body);

                const runner = await openai.beta.chat.completions
                    .stream({
                        model: 'gpt-3.5-turbo',
                        messages: [{ role: 'user', content: req.body.prompt }],
                    })
                    //.on('message', (msg) => console.log(msg))
                    //.on('content', (diff) => process.stdout.write(diff));

                const result = await runner.finalChatCompletion();
                
                res.status(200).send(result);
            } catch (e) {
                console.error(e);
            }
        });
    }
}

export default OpenAIApi;