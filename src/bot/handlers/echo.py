from aiogram.types import Message

# This package deals with a wrong input

async def echo_handler(message: Message) -> None:
    if (message.text[0] == "/"):
        await message.answer(f"Command is not found")
    else:
        await message.answer(f"I don't get what you say, {message.from_user.full_name}")
