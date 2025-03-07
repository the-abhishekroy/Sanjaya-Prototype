const DHENU_API_BASE_URL = process.env.NEXT_PUBLIC_DHENU_API_URL
const DHENU_API_KEY = process.env.NEXT_PUBLIC_DHENU_API_KEY

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function queryChatbot(message: string) {
  try {
    const systemPrompt = "You are Sanjaya, an AI agricultural assistant. You specialize in providing farming advice based on soil analysis and agricultural knowledge. Please provide detailed responses in both English and Hindi when appropriate.";
    
    const response = await fetch('https://api.dhenu.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'dh-66CCmXY-rT2I4xGYXqr15eQPZWXt4hvkdnpbCC5noVw'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      })
    });

    // Log response status for debugging
    console.log('API Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Details:', errorData);
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error: any) {
    console.error('Dhenu API Error:', error);
    throw error;
  }
}