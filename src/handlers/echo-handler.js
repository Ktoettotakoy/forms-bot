import { ADMINS } from "../../config.js";

export async function handleEcho(bot, chatId, text){
    console.log("Starting handleEcho")
	try {
		if(!ADMINS.includes(chatId)){
			await bot.sendMessage(chatId,"Type /start to start");
		}
	} catch (error) {
		console.log("Echo error: " + error)
	}
}