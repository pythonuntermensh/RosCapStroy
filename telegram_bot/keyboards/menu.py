from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

menu = ReplyKeyboardMarkup(
    resize_keyboard=True,
    one_time_keyboard=True,
    keyboard=[
        [
            KeyboardButton("Обработать вакансию✅"),
        ],
        [
            KeyboardButton("Написать отзыв💬")
        ]
    ]
)