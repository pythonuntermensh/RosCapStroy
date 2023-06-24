from aiogram import types

from loader import dp
from keyboards import menu

@dp.message_handler(commands=['start'])
async def handle_bla(message: types.Message):
    await message.answer("Привет! Я бот Кадрового Центра Минстроя России.\nЯ могу помочь разделить тебе описание вакансии на категории\
                         (Должностные обязанности, Требования к соискателю, Условия, Примечания)", reply_markup=menu)