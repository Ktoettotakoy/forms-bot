import { ADMINS, ADMIN_CHAT_ID } from '../../config.js'
import { createOrUpdate, getUserById, deleteUserById } from '../database/db.js';
import { start_command_admin_message, start_command_user_message, waiting_for_address_state_message, waiting_for_phone_state_message, share_phone_number_keyboard} from "../resources/text.js"

export async function handleServiceChoice(bot, chatId, text) {
  console.log("Starting handleServiceChoice")
  if(text === "/start"){
    if(!ADMINS.includes(chatId)){
      await bot.sendMessage(chatId, start_command_admin_message)
    } else{
      await bot.sendMessage(chatId, start_command_user_message, {
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
  } else if (text === "Option 1" || text === "Option 2" ) {
    
    const userData = {
      id: chatId,
      state: "waiting_for_address", // new state
      option: text // Add selected option to userData
    };

    // Call createOrUpdate to store or update userData in DynamoDB
    const result = await createOrUpdate(userData);

    // Check if the operation was successful
    if (result.success) {
      console.log('User data stored or updated successfully');
    } else {
      console.error('Failed to store or update user data:', result.error);
    }
    
    // notify user that it had proceed to the next step
    await bot.sendMessage(chatId, waiting_for_address_state_message);

  } else{
    console.log("We are in start state, but user doesn't write start");
  }
    
}
  
export async function handleAddressInput(bot, chatId, text) {
  console.log("Starting handleAddressInput")
  
  const userOption = (await getUserById(chatId)).data.option;

  if (text.length < 250){
    const userData = {
      id: chatId,
      state: "waiting_for_phone",
      option: userOption,
      address: text // Add selected option to userData
    };

    // Call createOrUpdate to store or update userData in DynamoDB
    const result = await createOrUpdate(userData);

    // Check if the operation was successful
    if (result.success) {
      console.log('User data stored or updated successfully');
    } else {
      console.error('Failed to store or update user data:', result.error);
    }

    await bot.sendMessage(chatId, waiting_for_phone_state_message, {
      reply_markup: {
        keyboard: [
          [
            { text: share_phone_number_keyboard, request_contact: true }
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true // Keyboard will disappear after button press
      }
    });
  } else {
    bot.sendMessage(chatId, "Message is too long")
  }
}
  
export async function handlePhoneInput(bot, chatId, message) {
  try {
    // Retrieve user's data from the database using chatId
    const userDataResult = await getUserById(chatId);
    
    if (userDataResult.success) {
      
      // Extract necessary information
      const userData = userDataResult.data;
      const option = userData.option;
      const address = userData.address;
      let phoneNumber = null;
      if (message.contact){
        phoneNumber = message.contact.phone_number;
      } else {
        phoneNumber = message.text;
      }

      // Format the current date and time
      const now = new Date();
      const dtString = now.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});

      // Create the formatted message string
      const formattedString = 
          `Время: ${dtString}\n` +
          `Сервис: ${option || 'N/A'}\n` +
          `Адрес: ${address || 'N/A'}\n` +
          `Номер телефона: ${phoneNumber || 'N/A'}`;
      
      bot.sendMessage(ADMIN_CHAT_ID, formattedString)

      // Delete entry from the database
      const deleteResult = await deleteUserById(chatId);
      
      if (deleteResult.success) {
        console.log('Entry deleted successfully');
      } else {
        console.error('Failed to delete entry:', deleteResult.error);
      }
    } else {
      console.error('Failed to retrieve user data:', userDataResult.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}