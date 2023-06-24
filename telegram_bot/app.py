from aiogram import executor
import handlers
from loader import dp

executor.start_polling(dp, skip_updates=True)