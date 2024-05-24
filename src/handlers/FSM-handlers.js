import { ADMINS, ADMIN_CHAT_ID } from '../../config.js'
import { createOrUpdate, getUserById, deleteUserById, checkSuccess } from '../database/db.js';
import { phone_keyboard, remove_inline_keyboard, start_keyboard } from '../resources/keyboards.js';
import { start_command_admin_message, start_command_user_message, waiting_for_address_state_message, waiting_for_phone_state_message, success_message} from "../resources/text.js"

export async function handleServiceChoice(bot, chatId, text) {
  console.log("Starting handleServiceChoice")

  if (text === "Option 1" || text === "Option 2" ) { // proposed keyboard options
    
    // update the state and information stored in the table
    const userData = {
      id: chatId,
      state: "waiting_for_address", // new state
      option: text 
    };

    // store userData in DynamoDB
    const result = await createOrUpdate(userData);

    // check if the operation was successful
    checkSuccess(result);
    
    // notify user that it had proceed to the next step
    await bot.sendMessage(chatId, waiting_for_address_state_message, remove_inline_keyboard);

  } else{
    console.log("We are in start state, but user doesn't write start"); //refactor later
  }
    
}
  
export async function handleAddressInput(bot, chatId, text, user) {
  // console log the current handler for debug
  console.log("Starting handleAddressInput")
  
  // get user information from the table
  const userOption = user.data.option

  // ideally validate text input
  if (text.length < 250){
    
    // update the state and stored information in the table
    const userData = {
      id: chatId,
      state: "waiting_for_phone",
      option: userOption,
      address: text
    };

    // update userData in DynamoDB
    const result = await createOrUpdate(userData);
    
    // check if the operation was successful
    checkSuccess(result);


    await bot.sendMessage(chatId, waiting_for_phone_state_message, phone_keyboard);
  } else {
    bot.sendMessage(chatId, "Message is too long")
  }
}
  
export async function handlePhoneInput(bot, chatId, message, user) {
  try {

    // Extract necessary information
    const option = user.data.option;
    const address = user.data.address;
    let phoneNumber = null;
    if (message.contact){
      phoneNumber = message.contact.phone_number;
    } else {
      phoneNumber = message.text;
    }

    // format the current date and time
    const now = new Date();
    const dtString = now.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});

    // create the formatted message string
    const formattedString = 
        `Время: ${dtString} + " GMT +0"\n` +
        `Сервис: ${option || 'N/A'}\n` +
        `Адрес: ${address || 'N/A'}\n` +
        `Номер телефона: ${phoneNumber || 'N/A'}`;
    
    bot.sendMessage("917351345", formattedString)

    // send confirmation to the user and remove the keyboard
    await bot.sendMessage(chatId, success_message, remove_inline_keyboard);

    // delete entry from the database
    const deleteResult = await deleteUserById(chatId);
    
    // check if the operation was successful
    checkSuccess(deleteResult)

  } catch (error) {
    console.error('Error:', error);
  }
}