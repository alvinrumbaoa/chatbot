// pages/api/chat.js
import OpenAI from 'openai-api';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const openai = new OpenAI(process.env.OPENAI_API_KEY);
      const userInput = req.body.userInput;

      const response = await openai.complete({
        engine: 'gpt-3.5-turbo-0613',
        prompt: userInput,
        maxTokens: 150
      });

      res.status(200).json({ aiResponse: response.data.choices[0].text.trim() });
    } catch (error) {
      res.status(500).json({ error: 'Error in OpenAI API call' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
