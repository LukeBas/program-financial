from flask import Flask
from flask_cors import CORS
from azure import authentication
from controllers.mainController import mainBlueprint
#Código principal
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.register_blueprint(mainBlueprint)

#Valida a autenticação e inicia o servidor
if __name__ == '__main__':
    #authValidation = authentication.start()
    app.run(debug=True, port=8000)
