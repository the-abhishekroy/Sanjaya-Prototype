import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

export const runtime = 'edge';

const configuration = new Configuration({
  apiKey: process.env.DHENU_API_KEY,
  basePath: 'https://api.dhenu.ai/v1',
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.createChatCompletion({
      model: 'dhenu2-in-8b-preview',
      messages,
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
    
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

