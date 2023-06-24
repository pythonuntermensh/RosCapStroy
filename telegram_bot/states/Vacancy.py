from aiogram.dispatcher.filters.state import State, StatesGroup

class Vacancy(StatesGroup):
    waiting_for_vacancy_text = State()