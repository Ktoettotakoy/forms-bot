import { share_phone_number_keyboard } from "./text.js"

export const start_keyboard = {
  reply_markup: {
    keyboard: [
      [
        {text: 'Option 1'},
        {text: 'Option 2'}
      ],
    ],
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