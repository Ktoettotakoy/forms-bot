from bot.config import config
from bot.resources.text import start_command_admin_message, start_command_user_message
from bot.utils.keyboard_markup import get_on_start_keyboard
from bot.handlers.fsm import FormService

from aiogram.fsm.context import FSMContext
from aiogram.types import Message



# This package is responsible for all commands reachable by /command_name in Tg

# Receives the necessary data and greets the user after starting the bot
async def start_handler(message: Message, state: FSMContext) -> None:

    user = message.from_user

    if user.id in config.bot.admin_id:
        await message.answer(start_command_admin_message, reply_markup=get_on_start_keyboard())
        await state.set_state(FormService.waiting_for_service_choice)
    else:
        await message.answer(start_command_user_message, reply_markup=get_on_start_keyboard())
        await state.set_state(FormService.waiting_for_service_choice)

        
    