import { ADMINS } from "../../config.js";
import { checkSuccess, createOrUpdate, deleteUserById, getButtonsList, updateButtonsList } from "../database/db-commands.js";
import { start_keyboard } from "../resources/keyboards.js";
import { start_command_admin_message, start_command_user_message, help_command_admin_message, help_command_user_message, buttons } from "../resources/text.js";


// Handle start command
export async function handleStartCommand(bot, message, user){
	console.log("Starting handleStartCommand")
	try {

		const userId = message.from.id;
		const chatId = message.chat.id;

		// if user doesn't exist in a table, create it
		if (user.data && Object.keys(user.data).length > 0){
			const result = await deleteUserById(chatId);
			console.log("Result of deletion: " + result)
			checkSuccess(result);
		}

		if(ADMINS.includes(userId)){
			await bot.sendMessage(chatId, start_command_admin_message)
		} else{
			// ask user to choose an option from proposed by start_keyboard, key stored in database 
			await bot.sendMessage(chatId, start_command_user_message, start_keyboard);
		}

		// New user, initialize state and store in DynamoDB
		await createOrUpdate({
			id: chatId,
			state: 'waiting_for_service_choice'
		});
		// console.log(`Initializing new user with chat ID: ${chatId}`);
	} catch (error) {
		console.log("Error handling start command:" + error)
	}
}

// Handle help command
export async function handleHelpCommand(bot, message) {
	try {
		// Check if the user is an admin
		if (ADMINS.includes(message.from.id)) {
			await bot.sendMessage(message.chat.id, help_command_admin_message);
		} else {
			await bot.sendMessage(message.chat.id, help_command_user_message);
		}
	} catch (error) {
		console.error("Error handling help command:", error);
	}
}

export async function handleGetChatIdCommand(bot, message) {
	try {
		const userId = message.from.id;
		const chatId = message.chat.id;
		// Check if the user is an admin
		if (ADMINS.includes(userId)) {
			await bot.sendMessage(chatId, `Chat ID is: ${chatId}\nYour User ID is: ${userId}`);
		}
	} catch (error) {
		console.error("Error handling get chat ID command:", error);
	}
}

// get all buttons as a list in the telegram command
export async function getButtonsListCommand(bot, chatId){
	console.log("Starting getButtonsListCommand");
	const buttons = await getButtonsList();
	await bot.sendMessage(chatId, JSON.stringify(buttons.data));
}

// Handle adding new button command
export async function addOptionButtonCommand(bot, message) {
	console.log("Starting addOptionButtonCommand");
	try {
		const userId = message.from.id;
		
		if (ADMINS.includes(userId)) {
			// get existing buttons
			const result = await getButtonsList();
			checkSuccess(result);
			let buttons = result.data;

			const chatId = message.chat.id;
			const text = message.text;
			const buttonText = text.replace('/add_option_button', '').trim();

			if(!buttons.includes(buttonText)){
				buttons.push(buttonText)
				console.log(buttons);
				const response = await updateButtonsList(buttons);
				checkSuccess(response)
				await bot.sendMessage(chatId, "Successfully added");
			} else {
				await bot.sendMessage(chatId, "Button already exists");
			}
		}
	} catch (error) {
		console.error("Error handling add option button command:", error);
	}
}

// Handle deleting a button command
export async function deleteOptionButtonCommand(bot, message) {
  console.log("Starting deleteOptionButtonCommand");
  try {
    const userId = message.from.id;

    if (ADMINS.includes(userId)) {
      // get existing buttons
      const result = await getButtonsList();
      checkSuccess(result);
      let buttons = result.data;

      const chatId = message.chat.id;
      const text = message.text;
      const buttonText = text.replace('/delete_option_button', '').trim();

      const toBeDeletedIndex = buttons.indexOf(buttonText);
      if (toBeDeletedIndex !== -1) {
        buttons.splice(toBeDeletedIndex, 1);
        console.log(buttons);
        const response = await updateButtonsList(buttons);
        checkSuccess(response);
        await bot.sendMessage(chatId, "Successfully deleted");
      } else {
        await bot.sendMessage(chatId, "Button not found");
      }
    }
  } catch (error) {
    console.error("Error handling delete option button command:", error);
  }
}

// Handle start dialog command for admin
export async function handleStartDialogCommand(bot, message) {
	console.log("Starting handleStartDialogCommand");
	try {
			const userId = message.from.id;

			// Check if the user is an admin
			if (ADMINS.includes(userId)) {
					// Load the start keyboard dynamically
					await bot.sendMessage(userId, start_command_user_message, start_keyboard);

					// New user, initialize state and store in DynamoDB
					await createOrUpdate({
							id: userId,
							state: 'waiting_for_service_choice'
					});
			}
	} catch (error) {
			console.log("Error handling start dialog command:" + error);
	}
}

