// # /start
export const start_command_user_message = "Для начала выберите нужную Вам услугу:"
export const start_command_admin_message = "Привет админ! Напиши /help чтоб узнать доступные команды"

// # /help 
// admin
export const help_command_admin_message = `
Доступные команды:
- /get_option_buttons: получить список всех доступных опций услуги
- /add_option_button <name>: создать дополнительную опцию услуги
- /delete_option_button <name>: удалить опцию услуги
- /get_chat_id: получить ID данного чата
- /start_dialog: запустить тестовый диалог
`;
//user
export const help_command_user_message = "Доступные команды:\n- /start: начать работу с ботом";

// # /echo
export const echo_user_message = "Type /start to start";

// # Text after button press (Address)
export const waiting_for_address_state_message = ("Укажите свой адрес, чтобы мы могли подобрать ближайший сервис доступный Вам");

// # Text after Address
export const waiting_for_phone_state_message = ("Оставьте свой номер телефона, в скором времени оператор свяжется с Вами");
export const share_phone_number_keyboard = ("Поделится номером");
// # Text after Phone number 
export const success_message = ("✅ Заявка успешно оставлена, ожидайте звонка");

