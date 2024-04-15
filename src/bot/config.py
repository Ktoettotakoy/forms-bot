from dataclasses import dataclass
from typing import List

# This package is responsible for configuring a bot from .env file


@dataclass
class Bot:
    token: str
    admin_id: List[int]


@dataclass
class Config:
    bot: Bot

def get_config(path: str):
    with open(path) as f:
        lines = f.readlines()

    config_data = {}
    for line in lines:
        key, value = line.strip().split("=")
        config_data[key.strip()] = value.strip()

    admin_id_strings = config_data.get("ADMIN_ID", "").split(",")
    admin_id_integers = [int(id_str) for id_str in admin_id_strings if id_str.strip().isdigit()]

    return Config(
        bot=Bot(
            token=config_data.get("TOKEN", ""),
            admin_id=admin_id_integers
        )
    )


config = get_config(".env")