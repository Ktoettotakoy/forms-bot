// # /start
export const start_command_user_message = "Для начала выберите нужную Вам услугу:"
export const start_command_admin_message = "Привет админ! Напиши /help чтоб узнать доступные команды"

// # /help 
// admin
export const help_command_admin_message = "Доступные команды:\n- /get_chat_id: получить ID данного чата\n- /show_dialog: запустить тестовый диалог";
//user
export const help_command_user_message = "Доступные команды:\n- /start: начать работу с ботом";

// # /echo


// # Key words in keyboard
export let buttons = []

const button_1_message = ("Продажа машин")
const button_2_message = ("Кафе")
const button_3_message = ("Салон Красоты")
const button_4_message = ("Установка сигнализаций")
const button_5_message = ("Страховая Компания")
const button_6_message = ("Передача посылок в/из Украины")

buttons.push(button_1_message)
buttons.push(button_2_message)
buttons.push(button_3_message)
buttons.push(button_4_message)
buttons.push(button_5_message)
buttons.push(button_6_message)

// # Text after button press (Address)
export const waiting_for_address_state_message = ("Укажите свой адрес, чтобы мы могли подобрать ближайший сервис доступный Вам")

// # Text after Address
export const waiting_for_phone_state_message = ("Оставьте свой номер телефона, в скором времени оператор свяжется с Вами")
export const share_phone_number_keyboard = ("Поделится номером")
// # Text after Phone number 
export const success_message = ("✅ Заявка успешно оставлена, ожидайте звонка")

