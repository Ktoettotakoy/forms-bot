// # /start
const start_command_user_message = "Для начала выберите нужную Вам услугу:"
const start_command_admin_message = "Привет админ! Напиши /help чтоб узнать доступные команды"

// # /echo

// # Key words in keyboard
let buttons = []

const button_1_message = ("Продажа машин")
const button_2_message = ("Кафе")
const button_3_message = ("Салон Красоты")
const button_4_message = ("Установка сигнализаций")
const button_5_message = ("Страховая Компания")
const button_6_message = ("Передача посылок в/из Украины")

buttons.append(button_1_message)
buttons.append(button_2_message)
buttons.append(button_3_message)
buttons.append(button_4_message)
buttons.append(button_5_message)
buttons.append(button_6_message)

// # Text after button press (Address)
const waiting_for_address_state_message = ("Укажите свой адрес, чтобы мы могли подобрать ближайший сервис доступный Вам")

// # Text after Address
const waiting_for_phone_state_message = ("Оставьте свой номер телефона, в скором времени оператор свяжется с Вами")

// # Text after Phone number 
const success_message = ("✅ Заявка успешно оставлена, ожидайте звонка")