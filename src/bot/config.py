from dataclasses import dataclass
from typing import List
import os

# This package is responsible for configuring a bot from .env file


@dataclass
class Bot:
    token: str
    admin_id: List[int]
    admin_chat_id: int


@dataclass
class Config:
    bot: Bot

def get_config(path: str):
    token = os.environ.get("TOKEN", "")
    admin_id_str = os.environ.get("ADMIN_ID", "")
    admin_id_integers = [int(id_str.strip()) for id_str in admin_id_str.split(",") if id_str.strip().isdigit()]
    chat = os.environ.get("ADMIN_CHAT_ID", "")

    return Config(
        bot=Bot(
            token=token,
            admin_id=admin_id_integers,
            admin_chat_id=chat
        )
    )


config = get_config(".env")