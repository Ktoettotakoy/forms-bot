import asyncio
import logging
import sys
from bot.config import config

## My own commands 
# from bot.utils.commands_menu import set_commands
from bot.handlers.echo import echo_handler
from bot.handlers.commands import start_handler

## Provided by aiogram
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command

dp = Dispatcher()
bot = Bot(token=config.bot.token, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

def main() -> None:
    dp.message.register(start_handler, CommandStart())
    dp.message.register(echo_handler)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())