import { ADMINS, ADMIN_CHAT_ID } from "../../config.js";
import { echo_user_message } from "../resources/phrases.js";

export async function handleEcho(bot, chatId, text){
    console.log("Starting handleEcho")
	try {
		if(!ADMINS.includes(chatId) && chatId != ADMIN_CHAT_ID ){
			await bot.sendMessage(chatId, echo_user_message);
		}
	} catch (error) {
		console.log("Echo error: " + error)
	}
}