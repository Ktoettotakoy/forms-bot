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
        await message.answer(start_command_admin_message)
    else:
        await message.answer(start_command_user_message, reply_markup=get_on_start_keyboard())
        await state.set_state(FormService.waiting_for_service_choice)

async def help_handler(message: Message) -> None:
    user = message.from_user
    
    if user.id in config.bot.admin_id:
        await message.answer("Доступные комманды:\n- /get_chat_id: получить ID даного чата\n- /show_fsm: запустить тестовый диалог")
        
async def get_chat_id(message: Message) -> None:
    user = message.from_user
    
    if user.id in config.bot.admin_id:
        await message.answer("Chat id is: " + str(message.chat.id))

async def start_fsm(message: Message, state: FSMContext) -> None:
    user = message.from_user
    
    if user.id in config.bot.admin_id:
        await message.answer("Тестовый запуск диалога", reply_markup=get_on_start_keyboard())
        await state.set_state(FormService.waiting_for_service_choice)