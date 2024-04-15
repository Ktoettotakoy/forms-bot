from bot.config import config
from aiogram.types import Message

# This package is responsible for all commands reachable by /command_name in Tg

# Receives the necessary data and greets the user after starting the bot
async def start_handler(message: Message) -> None:

    user = message.from_user

    if user.id in config.bot.admin_id:
        await message.answer(f"Hey admin {user.full_name}!")
    else:
        await message.answer(f"Hey, you're definitely not an admin")