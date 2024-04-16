from bot.config import config
from bot.resources.text import buttons, waiting_for_address_state_message, waiting_for_phone_state_message, success_message
from bot.utils.keyboard_markup import get_phone_num_keyboard

from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

from aiogram.types import Message, ReplyKeyboardRemove

from datetime import datetime
# This package deals with an input after a start keyboard press

class FormService(StatesGroup):
    waiting_for_service_choice = State()
    waiting_for_address = State()
    waiting_for_phone = State()



async def messages_state_handler(message: Message, state: FSMContext) -> None:

    current_state = await state.get_state()
    
    if current_state == 'FormService:waiting_for_service_choice':
        if(message.text in buttons):
            service = message.text
            await state.update_data(service=service)
            await message.answer(text=waiting_for_address_state_message, reply_markup=ReplyKeyboardRemove())
            await state.set_state(FormService.waiting_for_address)
    elif current_state == 'FormService:waiting_for_address':
        print(len(message.text))
        if(len(message.text) < 500):
            address = message.text
            await state.update_data(address=address)
            await state.set_state(FormService.waiting_for_phone)
            await message.answer(text=waiting_for_phone_state_message, reply_markup=get_phone_num_keyboard())
        else:
            await message.answer(text="Address is too long, try again")
    elif current_state == 'FormService:waiting_for_phone':
        
        bot = message.bot
        chat_id = config.bot.admin_chat_id

        if message.contact:
            phone_num = message.contact.phone_number
        else:
            phone_num = message.text
        
        await state.update_data(phone_num=phone_num) 
        
        # dd/mm/YY H:M:S
        dt_string = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

        data = await state.get_data()

        message_string =  f"Time: {dt_string}\n"
        message_string += f"Service: {data.get('service', 'N/A')}\n"
        message_string += f"Address: {data.get('address', 'N/A')}\n"
        message_string += f"Phone Number: {data.get('phone_num', 'N/A')}"
        
        await message.answer(text=success_message, reply_markup=ReplyKeyboardRemove())
        await bot.send_message(chat_id=chat_id, text=message_string)
        await state.clear()
        
