from aiogram.types import Message

# This package deals with a wrong input

async def echo_handler(message: Message) -> None:
    if (message.text[0] == "/"):
        await message.answer(f"Даной команды не существует")
    else:
        await message.answer(f"Напищите /start чтоб начать взаимодействие, {message.from_user.first_name}")
