import { TOKEN, ADMINS } from '../../config.js'
import TelegramBot from 'node-telegram-bot-api';
const bot = new TelegramBot(TOKEN); // make sure that it is the same bot 

export async function handleServiceChoice(chatId, text) {
    if(!ADMINS.includes(chat.id)){
        await bot.sendMessage(chat.id, "Hello Admin")
      } else{
        console.log("target")
        await bot.sendMessage(chat.id, "Для начала выберите нужную Вам услугу:", {
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
            currentState: 'waiting_for_service_choice',
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
    // Handle logic for service choice state
    // Update DynamoDB state and data if necessary
  }
  
  async function handleAddressInput(chatId, text) {
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
    // Handle logic for address input state
    // Update DynamoDB state and data if necessary
  }
  
  async function handlePhoneInput(chatId, text) {
    // Handle logic for phone input state
    // Update DynamoDB state and data if necessary
  }