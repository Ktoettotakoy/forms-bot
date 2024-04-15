import asyncio
import logging
import sys
from bot.config import config

## My own commands 
from bot.handlers.echo import echo_handler
from bot.handlers.commands import start_handler
from bot.handlers.fsm import messages_state_handler
from bot.resources.text import description, short_description

## Provided by aiogram
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command

dp = Dispatcher()

async def on_start():
    await bot.set_my_short_description(short_description=short_description)
    await bot.set_my_description(description=description)

async def main() -> None:
    dp.startup.register(on_start)
    dp.message.register(start_handler, CommandStart())
    dp.message.register(messages_state_handler)
    dp.message.register(echo_handler)

    try:
        await dp.start_polling(bot)
    finally:
        bot.session.close()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    bot = Bot(token=config.bot.token, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    asyncio.run(main())