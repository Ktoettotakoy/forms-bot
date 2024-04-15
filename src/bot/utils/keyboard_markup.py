from bot.resources.text import button_1_message, button_2_message

from aiogram.types import ReplyKeyboardMarkup, KeyboardButton


def get_on_start_keyboard():
    
    button1 = KeyboardButton(text=button_1_message) # change later
    button2 = KeyboardButton(text=button_2_message) # change later

    buttons = [button1, button2]
    markup = ReplyKeyboardMarkup(keyboard=[buttons])
    
    return markup 