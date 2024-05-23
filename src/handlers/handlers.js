import { TOKEN, ADMINS } from '../../config.js'
import { createOrUpdate } from '../database/db.js';
import { start_command_admin_message, start_command_user_message, waiting_for_address_state_message, waiting_for_phone_state_message} from "../resources/text.js"

export async function handleServiceChoice(bot, chatId) {
    if(!ADMINS.includes(chat.id)){
        await bot.sendMessage(chat.id, start_command_admin_message)
      } else{
        console.log("target")
        await bot.sendMessage(chat.id, start_command_user_message, {
          reply_markup: {
            keyboard: [
              [
                {text: 'Option 1'},
                {text: 'Option 2'}
              ],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          }
        });
      }
      bot.once('callback_query', async (query) => {
        const selectedOption = query.data; // Get the selected option from the callback query
        const userData = {
            chatId: chatId,
            currentState: "waiting_for_address",
            selectedOption: selectedOption // Add selected option to userData
        };

        // Call createOrUpdate to store or update userData in DynamoDB
        const result = await createOrUpdate(userData);

        // Check if the operation was successful
        if (result.success) {
            console.log('User data stored or updated successfully');
        } else {
            console.error('Failed to store or update user data:', result.error);
        }
    });
  }
  
  async function handleAddressInput(bot, chatId, text) {
    console.log("options")

    // Handle logic for address input state
    // Update DynamoDB state and data if necessary
  }
  
  async function handlePhoneInput(bot, chatId, text) {
    await bot.sendMessage(chat.id, waiting_for_phone_state_message, {
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
    // Handle logic for phone input state
    // Update DynamoDB state and data if necessary
  }