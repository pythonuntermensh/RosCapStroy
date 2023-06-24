from aiogram import Bot
from aiogram.dispatcher import Dispatcher
from aiogram.contrib.fsm_storage.memory import MemoryStorage
import pickle

from utils import Predictor

TOKEN = "5997943335:AAHuiKuIU6PiWtTbTdt2RB6LFuO2TRe18Kc"
MODEL_FILE_NAME = "model_v3.pk"
ADMIN_ID = 1731918785

def load_model():
    print("Loading the model...")
    with open('./models/' + MODEL_FILE_NAME,'rb') as f:
        model = pickle.load(f)
        print("The model has been loaded...doing predictions now...")
        return model   
model = load_model()

predictor = Predictor(model)
bot = Bot(token=TOKEN)
storage = MemoryStorage()
dp = Dispatcher(bot, storage=storage)