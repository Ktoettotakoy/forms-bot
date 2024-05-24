import { ADMINS } from "../../config.js";
import { checkSuccess, createOrUpdate, deleteUserById } from "../database/db.js";
import { start_keyboard } from "../resources/keyboards.js";
import { start_command_admin_message, start_command_user_message, help_command_admin_message, help_command_user_message } from "../resources/text.js";

export async function handleStartCommand(bot, chatId, user){
	console.log("Starting handleStartCommand")
	try {
		if (user.data && Object.keys(user.data).length > 0){
			
			// apparently no user in here
			const result = await deleteUserById(chatId);
			console.log("Result of deletion: " + result)
			checkSuccess(result);
		}

		if(false){ // ADMINS.includes(chatId) for admin purposes. Now disabled
			await bot.sendMessage(chatId, start_command_admin_message)
		} else{
			// ask user to choose an option from proposed by start_keyboard
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

export async function handleHelpCommand(bot, chatId) {
	try {
		// Check if the user is an admin
		if (ADMINS.includes(chatId)) {
			await bot.sendMessage(chatId, help_command_admin_message);
		} else {
			await bot.sendMessage(chatId, help_command_user_message);
		}
	} catch (error) {
		console.error("Error handling help command:", error);
	}
}