import { handleServiceChoice } from './src/handlers/handlers.js';
import { createOrUpdate, getUserById } from './src/database/db.js';

// chat.id and message from body is missing here

export const handler = async (event) => {

  try {

    const body = JSON.parse(event.body);
    const { chat, text } = body.message;
    
    // Retrieve user's current state from DynamoDB
    const userResult = await getUserById(chat.id);
    let userData = userResult.success ? userResult.data : null;

    if (!userData) {
      // New user, initialize state and store in DynamoDB
      await createOrUpdate({
        chatId: chat.id,
        currentState: 'waiting_for_service_choice'
      });
    } else {
      // User exists, handle message based on current state
      const currentState = userData.currentState;

      switch (currentState) {
        case 'waiting_for_service_choice':
          // Handle service choice logic
          await handleServiceChoice(bot, chat.id);
          break;
        case 'waiting_for_address':
          // Handle address input logic
          await handleAddressInput(bot, chat.id, text);
          break;
        case 'waiting_for_phone':
          // Handle phone input logic
          await handlePhoneInput(bot, chat.id, text);
          break;
        default:
          console.log("default")
          await bot.sendMessage(chat.id, "Something went wrong")
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
