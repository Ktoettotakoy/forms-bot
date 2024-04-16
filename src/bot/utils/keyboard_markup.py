from bot.resources.text import button_1_message, button_2_message, button_3_message
from bot.resources.text import button_4_message, button_5_message, button_6_message

from aiogram.types import ReplyKeyboardMarkup, KeyboardButton
from aiogram.utils.keyboard import ReplyKeyboardBuilder



def get_on_start_keyboard() -> ReplyKeyboardMarkup:

    builder = ReplyKeyboardBuilder()

    button_messages = [button_1_message, button_2_message, button_3_message, button_4_message, button_5_message, button_6_message]

    for button_message in button_messages:
        builder.button(text=button_message)
    
    builder.adjust(3)
    return builder.as_markup(resize_keyboard=True)

def get_phone_num_keyboard() -> ReplyKeyboardMarkup:
    builder = ReplyKeyboardBuilder()

    builder.button(text="Поделиться Номером Телефона", request_contact=True)
    builder.adjust(1)

    return builder.as_markup(resize_keyboard=True)