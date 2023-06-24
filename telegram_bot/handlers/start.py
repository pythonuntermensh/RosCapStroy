from aiogram import types

from loader import dp
from keyboards import menu

@dp.message_handler(commands=['start'])
async def handle_bla(message: types.Message):
    await message.answer("Привет! Я бот Кадрового Центра Минстроя России.\nЯ могу помочь разделить тебе описание вакансии на категории!🆕\nНажми на кнопку Обработать вакансию✅, чтобы попробовать!", reply_markup=menu)