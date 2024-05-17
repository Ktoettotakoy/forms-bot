import { botAPI } from './config.js'
import fetch from 'node-fetch';

async function sendMessage({chatId, text}) {
  const params = new URLSearchParams({
    chat_id: chatId,
    text: `You said ${text}`
  })

  try {
    const response = await fetch(`${botAPI}/sendMessage?${params}`, {
      method: 'GET'
    });

    const data = await response.json();
    if (data.ok) {
      console.log("Message sent successfully:", data);
    } else {
      console.log("Failed to send message:", data.description);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

export const handler = async (event) => {
  
  const body = JSON.parse(event.body);
  
  const { chat, text } = body.message;

  try {
    await sendMessage({
      chatId:chat.id, text
    })
  } catch (error) {
    console.error('Error:', error);
  }
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
