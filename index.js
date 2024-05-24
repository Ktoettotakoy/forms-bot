import { handleAddressInput, handleServiceChoice, handlePhoneInput } from './src/handlers/FSM-handlers.js';
import { handleStartCommand } from './src/handlers/command-handlers.js';
import { checkSuccess, createOrUpdate, getUserById } from './src/database/db.js';

import TelegramBot from 'node-telegram-bot-api';

import { TOKEN } from "./config.js"
const bot = new TelegramBot(TOKEN);

export const handler = async (event) => {

  try {

    const body = JSON.parse(event.body);
    const { chat, text } = body.message;

    if(text && text.startsWith("/")){
      const user = await getUserById(chat.id);

      switch (text) {
        case "/start":
          await handleStartCommand(bot, chat.id, user)
          break;
      
        default:
          await bot.sendMessage(chat.id, "Unknown command")
          break;
      }
    } else {
      // get user information from the table
      const user = await getUserById(chat.id);
      // check if the operation was successful 
      checkSuccess(user)

      console.log(`User retrieval result: ${JSON.stringify(user)}`);

      switch (user.data.state) {
        case 'waiting_for_service_choice': // state when we wait for option choice 
          // Handle service choice logic
          await handleServiceChoice(bot, chat.id, text);
          break;
        case 'waiting_for_address': // state when we wait for an address
          // Handle address input logic
          await handleAddressInput(bot, chat.id, text, user);
          break;
        case 'waiting_for_phone': // state when we wait for a phone number
          // Handle phone input logic
          await handlePhoneInput(bot, chat.id, body.message, user);
          break;
        default: // echo state
          console.log("default")
          await bot.sendMessage(chat.id, "Type /start to start")
          break;
      }
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
