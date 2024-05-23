import { handleServiceChoice, handleAddressInput, handlePhoneInput } from './src/handlers/handlers.js';
import { createOrUpdate, getUserById } from './src/database/db.js';

import TelegramBot from 'node-telegram-bot-api';
import { TOKEN } from "./config.js"
const bot = new TelegramBot(TOKEN);

export const handler = async (event) => {

  try {

    const body = JSON.parse(event.body);
    const { chat, text } = body.message;
    
    // Retrieve user's current state from DynamoDB
    let userResult = await getUserById(chat.id);
    let userData = userResult.success ? userResult.data : null;

    if (!userData || !userData.id) {
      // New user, initialize state and store in DynamoDB
      await createOrUpdate({
        id: chat.id,
        state: 'waiting_for_service_choice'
      });
      console.log(`Initializing new user with chat ID: ${chat.id}`);
    }
    // User exists, handle message based on current state
    userResult = await getUserById(chat.id);
    console.log(`User retrieval result: ${JSON.stringify(userResult)}`);
    
    const currentState = userResult.data.state;
    console.log(`Current state for chat ID ${chat.id}: ${currentState}`);

    switch (currentState) {
      case 'waiting_for_service_choice':
        // Handle service choice logic
        await handleServiceChoice(bot, chat.id, text);
        break;
      case 'waiting_for_address':
        // Handle address input logic
        await handleAddressInput(bot, chat.id, text);
        break;
      case 'waiting_for_phone':
        // Handle phone input logic
        await handlePhoneInput(bot, chat.id, body.message);
        break;
      default:
        console.log("default")
        await bot.sendMessage(chat.id, "Something went wrong")
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
