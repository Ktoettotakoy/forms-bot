import { handleAddressInput, handleServiceChoice, handlePhoneInput } from './src/handlers/FSM-handlers.js';
import { handleGetChatIdCommand, handleHelpCommand, handleStartCommand, 
  addOptionButtonCommand, getButtonsListCommand, 
  deleteOptionButtonCommand, handleStartDialogCommand } from './src/handlers/command-handlers.js';
import { checkSuccess, getUserById } from './src/database/db-commands.js';

import TelegramBot from 'node-telegram-bot-api';

import { TOKEN } from "./config.js"
import { handleEcho } from './src/handlers/echo-handler.js';
// initialize bot
const bot = new TelegramBot(TOKEN);

// entry point to lambda
export const handler = async (event) => {

  try {

    // get message and decompose it
    const body = JSON.parse(event.body);
    const { chat, text } = body.message;

    // if statement handles commands such as /help and so on
    // else case handles interaction with user who fills the form
    if(text && text.startsWith("/")){
      
      // commands with parameter input used by admin
      if (text.startsWith("/add_option_button")){ 
        await addOptionButtonCommand(bot, body.message);
      } else if (text.startsWith("/delete_option_button")) {
        await deleteOptionButtonCommand(bot, body.message);
      } 
      else {
        // other more basic commands, for definitions go to command-handler
        switch (text) { 
          case "/start":
            const userData = await getUserById(chat.id);
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
          await handleEcho(bot, chat.id, text)
          break;
      }
    }
  } catch (error) {
    // if the error occurs, it is going to be seen in logs
    console.error('Error:', error);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Message processed'),
  };
  return response;
};
