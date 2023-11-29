// pages/api/chat.js
import axios from 'axios';
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST, and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*', // Adjust this to restrict the allowed origins
  })
);

export default async function handler(req, res) {

  await cors(req, res);

  if (req.method === 'POST') {
    try {
      const { userInput } = req.body;
      // Replace the URL and headers with the actual OpenAI API endpoint and headers
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt: userInput,
          max_tokens: 150
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      );
    // Assuming the AI response is in the following format: { data: { choices: [{ text: 'response' }] } }
    const aiTextResponse = openaiResponse.data.choices[0].text;
    res.status(200).json({ aiResponse: aiTextResponse });
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
} else {
  res.status(405).send('Method Not Allowed');
}
}
