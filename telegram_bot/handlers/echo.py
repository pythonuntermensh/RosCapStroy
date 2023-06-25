from aiogram import types
from aiogram.dispatcher.storage import FSMContext

from loader import dp, bot, predictor, ADMIN_ID

from keyboards import menu
from states import Vacancy, Report


@dp.message_handler(text=["Обработать вакансию✅"])
async def handle_default_echo(message: types.Message):
    await message.answer("Введите описание вакансии")
    await Vacancy.waiting_for_vacancy_text.set()

@dp.message_handler(state=Vacancy.waiting_for_vacancy_text, content_types=types.ContentType.TEXT)
async def handle_default_echo(message: types.Message, state: FSMContext):
    prediction = predictor.get_final_categories(message.text)
    text = ""
    text += "" if "responsibilities" not in prediction else "Должностные обязанности: " + prediction["responsibilities"]
    text += "" if "responsibilities" not in prediction else "\n\nТребования к соискателю: " + prediction["requirements"]
    text += "" if "responsibilities" not in prediction else "\n\nУсловия: " + prediction["terms"]
    text += "" if "responsibilities" not in prediction else "\n\nПримечания: " + prediction["notes"]

    await message.answer(str(text), reply_markup=menu)
    await state.finish()


@dp.message_handler(text=["Написать отзыв💬"])
async def handle_default_echo(message: types.Message):
    await message.answer("Введите отзыв")
    await Report.waiting_for_report_text.set()

@dp.message_handler(state=Report.waiting_for_report_text, content_types=types.ContentType.TEXT)
async def handle_default_echo(message: types.Message, state: FSMContext):
    await bot.send_message(ADMIN_ID, "Получен новый отзыв! Текст отзыва:\n\n" + message.text)
    await message.answer("Ваш отзыв был отправлен администратору!", reply_markup=menu)
    await state.finish()


@dp.message_handler(text=["Наш сайт😈"])
async def handle_default_echo(message: types.Message):
    await message.answer("Наш великолепный веб-сайт - https://12mativ.github.io/RosCapStroyWeb/", reply_markup=menu)


@dp.message_handler(state=None)
async def handle_default_echo(message: types.Message):
    await message.answer("Неизвестная команда, попробуйте еще раз!⛔", reply_markup=menu)




