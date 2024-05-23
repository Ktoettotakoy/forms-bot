import { TOKEN, ADMINS } from './config.js'

import TelegramBot from 'node-telegram-bot-api';
const bot = new TelegramBot(TOKEN);

export const handler = async (event) => {
  
  const body = JSON.parse(event.body);
  
  const { chat, text } = body.message;
  console.log(text)
  console.log(body.message)
  try {
    
    switch (text) {
      case "/start":
        if(ADMINS.includes(chat.id)){
          bot.sendMessage("Hello Admin")
        } else{
          bot.sendMessage("Hello not an admin")
        }
        break;
      
    
      default:
        break;
    }
    
  } catch (error) {
    console.error('Error:', error);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Message processed'),
  };
  return response;
};
