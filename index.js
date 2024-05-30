import { handleAddressInput, handleServiceChoice, handlePhoneInput } from './src/handlers/FSM-handlers.js';
import { handleGetChatIdCommand, handleHelpCommand, handleStartCommand, 
  addOptionButtonCommand, getButtonsListCommand, 
  deleteOptionButtonCommand, handleStartDialogCommand } from './src/handlers/command-handlers.js';
import { checkSuccess, getUserById } from './src/database/db-commands.js';

import TelegramBot from 'node-telegram-bot-api';

import { ADMIN_CHAT_ID, TOKEN } from "./config.js"
import { handleEcho } from './src/handlers/echo-handler.js';
const bot = new TelegramBot(TOKEN);

export const handler = async (event) => {

  try {

    const body = JSON.parse(event.body);
    const { chat, text } = body.message;

    if(text && text.startsWith("/")){
      const userData = await getUserById(chat.id);

      if (text.startsWith("/add_option_button")){ // commands with parameter input 
        await addOptionButtonCommand(bot, body.message);
      } else if (text.startsWith("/delete_option_button")) {
        await deleteOptionButtonCommand(bot, body.message);
      } 
      else {
        switch (text) { // other commands
          case "/start":
            await handleStartCommand(bot, body.message, userData);
            break;
          case "/help":
            await handleHelpCommand(bot, body.message);
            break;
          case "/get_chat_id":
            await handleGetChatIdCommand(bot, body.message);
            break;
          case "/get_option_buttons":
            await getButtonsListCommand(bot, chat.id);
            break;
          case "/start_dialog":
            await handleStartDialogCommand(bot, body.message);
            break;
          default:
            await bot.sendMessage(chat.id, "Unknown command");
            break;
        }
      }
    } else {
      // get user information from the userTable
      const userData = await getUserById(chat.id);
      // check if the operation was successful 
      checkSuccess(userData)

      console.log(`User retrieval result: ${JSON.stringify(userData)}`);

      switch (userData.data.state) {
        case 'waiting_for_service_choice': // state when we wait for option choice 
          // Handle service choice logic
          await handleServiceChoice(bot, chat.id, text);
          break;
        case 'waiting_for_address': // state when we wait for an address
          // Handle address input logic
          await handleAddressInput(bot, chat.id, text, userData);
          break;
        case 'waiting_for_phone': // state when we wait for a phone number
          // Handle phone input logic
          await handlePhoneInput(bot, chat.id, body.message, userData);
          break;
        default: // echo state
          if (!chat.id === ADMIN_CHAT_ID){
            await handleEcho(bot, chat.id, text)
          }
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
