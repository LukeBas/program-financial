from flask import Blueprint
from flask import Flask, jsonify
from userInformation import fordUser
from dataHandler import sheetColector
import os

#Código responsável por gerenciar os endpoints da aplicação
mainBlueprint = Blueprint('main', __name__)

@mainBlueprint.route('/')
def home():
    return "Hello world!"

@mainBlueprint.route('/testConnection')
def test():
    return "validated"

@mainBlueprint.route('/userData')
def get_user_information():
    print(fordUser.user_name + "/" + fordUser.user_email)
    user_data = [fordUser.user_name, fordUser.user_email]
    return jsonify(user_data)

@mainBlueprint.route('/getProgramMY')
def get_program_my():
    return sheetColector.extractProgramMY(os.getcwd()+"\documents\Change_Log.xlsx")

@mainBlueprint.route('/getTableData/<program>/<model_year>')
def get_table_data(program, model_year):
    array = [program, model_year]
    return sheetColector.extractTableData(os.getcwd()+"\documents\Change_Log.xlsx", array)