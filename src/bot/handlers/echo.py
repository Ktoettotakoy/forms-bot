from bot.config import config

from aiogram.types import Message

# This package deals with a wrong input

async def echo_handler(message: Message) -> None:
    user = message.from_user

    if user.id not in config.bot.admin_id:
        if (message.text[0] == "/"):
            await message.answer(f"Даной команды не существует")
        else:
            await message.answer(f"Напишите /start чтоб начать взаимодействие, {message.from_user.first_name}")
