import math

import pandas as pd
from flask import jsonify


def extractProgramMY(path):
    excelFile = pd.read_excel(path, sheet_name='Sheet1')
    programMY = excelFile["Program & MY"]
    programMYMapping = []

    for row in programMY:
        if isinstance(row, float) and math.isnan(row):
            continue
        seperatedData = row.split("-")
        modelYear = seperatedData[0].strip()
        program = seperatedData[1].strip()[0:seperatedData[1].strip().find(" ")]
        programMYMapping.append({"modelYear": modelYear, "program": program})

    return programMYMapping

def extractTableData(path, filter):
    #'filter' pode ser o MY ou o Programa
    #O parâmetro 'filter' tem que ser passado como um array desse jeito: ['PROGRAM','MY']
    df = pd.read_excel(path)

    program = filter[0]
    modelYear = filter[1]
    filtro = df['Program & MY'].str.contains(program, case=False, na=False) & \
             df['Program & MY'].str.contains(modelYear, case=False, na=False)
    df_filtrado = df[filtro]

    if not df_filtrado.empty:
        # Substitui NaN por string vazia
        df_filtrado = df_filtrado.fillna('')
        data_dict = df_filtrado.to_dict()
        transformed_data = {
            key: list(sub_dict.values())
            for key, sub_dict in data_dict.items()
        }
        return jsonify(transformed_data)
    else:
        return jsonify({"error": "No data found"}), 404