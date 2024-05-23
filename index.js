import { TOKEN, ADMINS } from './config.js'

import TelegramBot from 'node-telegram-bot-api';
const bot = new TelegramBot(TOKEN);

export const handler = async (event) => {
  
  const body = JSON.parse(event.body);
  
  try {
    if (body.message){
      const { chat, text } = body.message;
      switch (text) {
        case '/start':
          if(!ADMINS.includes(chat.id)){
            await bot.sendMessage(chat.id, "Hello Admin")
          } else{
            console.log("target")
            await bot.sendMessage(chat.id, "Для начала выберите нужную Вам услугу:", {
              reply_markup: {
                keyboard: [
                  [
                    {text: 'Option 1', callback_data: "Hui" },
                    {text: 'Option 2', callback_data: "HELP" }
                  ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true
              }
            });
          }
          break;
        case 'option 1':
        case 'option 2':
          console.log("options")
          await bot.sendMessage(chat.id, "HUI")
          await bot.sendMessage(chat.id, "Укажите свой адрес, чтобы мы могли подобрать ближайший сервис доступный Вам:", {
            reply_markup: {
              keyboard: [
                [
                  { text: 'Option A' },
                  { text: 'Option B' }
                ],
              ],
              one_time_keyboard: true // Keyboard will disappear after button press
            }
          });
          break;
          break;
        default:
          console.log("default")
          await bot.sendMessage(chat.id, text)
          break;
      }
    } else if (body.callback_query){
      console.log(body.callback_query)
      const { data, message } = body.callback_query;
      await bot.sendMessage(message, data)
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
