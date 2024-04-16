# on_start
description = (
    "🤖 Добро пожаловать в нашего Телеграм бота для приема заявок с вопросами!\n\n"
    "Этот бот предназначен для удобного подачи заявок с вопросами и получения оперативной помощи от нашей команды. "
    "Независимо от того, нужна ли вам информация о наших услугах, решение проблемы или консультация по интересующему "
    "вас вопросу - наш бот готов помочь!"
)

short_description = ("🤖 Бот для помощи поиска удобных сервисов")

# /start
start_command_user_message = "Для начала выберите нужную Вам услугу:"
start_command_admin_message = "Привет админ! Напиши /help чтоб узнать доступные команды"

# /echo

# Key words in keyboard
buttons = []

button_1_message = ("Продажа машин")
button_2_message = ("Кафе")
button_3_message = ("Салон Красоты")
button_4_message = ("Установка сигнализаций")
button_5_message = ("Страховая Компания")
button_6_message = ("Передача посылок в/из Украины")

buttons.append(button_1_message)
buttons.append(button_2_message)
buttons.append(button_3_message)
buttons.append(button_4_message)
buttons.append(button_5_message)
buttons.append(button_6_message)

# Text after button press (Address)
waiting_for_address_state_message = ("Укажите свой адрес, чтобы мы могли подобрать ближайший сервис доступный Вам")

# Text after Address
waiting_for_phone_state_message = ("Оставьте свой номер телефона, в скором времени оператор свяжется с Вами")

# Text after Phone number 
success_message = ("✅ Заявка успешно оставлена, ожидайте звонка")
