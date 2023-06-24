import pickle
from flask import Flask, jsonify, request

from util import Predictor
#from flask_cors import CORS

app = Flask(__name__)
#CORS(app)

MODEL_FILE_NAME = "model_v2.pk"

model = None

def load_model():
    print("Loading the model...")
    with open('./models/' + MODEL_FILE_NAME,'rb') as f:
        model = pickle.load(f)
        print("The model has been loaded...doing predictions now...")
        return model

@app.route('/predict', methods=['POST'])
def apicall():
    try:
        test_json = request.get_json()
        text = test_json["text"]
    except Exception as e:
        raise e

    if not text:
        return 400
    else:
        predictor = Predictor(model)
        
        predictions = predictor.get_final_categories(text)

        responses = jsonify(predictions)
        responses.status_code = 200

        return responses
    
if __name__ == '__main__':
    model = load_model()
    app.run(debug=True)
