import { share_phone_number_keyboard, buttons } from "./text.js"

const keyboardButtons = buttons.map(button => ({ text: button }));

const keyboardRows = [];
for (let i = 0; i < keyboardButtons.length; i += 3) {
  keyboardRows.push(keyboardButtons.slice(i, i + 3));
}

export const start_keyboard = {
  reply_markup: {
    remove_keyboard: true,
    keyboard: keyboardRows,
    resize_keyboard: true,
    one_time_keyboard: true
  }
}

export const phone_keyboard = {
  reply_markup: {
    keyboard: [
      [
        { text: share_phone_number_keyboard, request_contact: true }
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true
  }
}

export const remove_inline_keyboard = {
  reply_markup: {
    remove_keyboard: true
  }
}