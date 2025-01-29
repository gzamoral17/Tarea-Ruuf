from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permitir todas las solicitudes CORS por defecto

def calcular_paneles(techo_x, techo_y, panel_a, panel_b):
    # Función auxiliar para calcular cuántos paneles caben con una orientación específica
    def paneles_por_orientacion(techo_x, techo_y, panel_a, panel_b):
        ajuste_horizontal = techo_x // panel_a
        ajuste_vertical = techo_y // panel_b
        paneles = ajuste_horizontal * ajuste_vertical

        # Área sobrante en el eje horizontal
        sobrante_x = techo_x - (ajuste_horizontal * panel_a)
        paneles_sobrantes_x = (sobrante_x // panel_b) * (techo_y // panel_a)

        # Área sobrante en el eje vertical
        sobrante_y = techo_y - (ajuste_vertical * panel_b)
        paneles_sobrantes_y = (techo_x // panel_a) * (sobrante_y // panel_b)

        return paneles + max(paneles_sobrantes_x, paneles_sobrantes_y)

    # Calcular el máximo de ambas orientaciones
    resultado_1 = paneles_por_orientacion(techo_x, techo_y, panel_a, panel_b)
    resultado_2 = paneles_por_orientacion(techo_x, techo_y, panel_b, panel_a)

    return max(resultado_1, resultado_2)

@app.route('/calcular', methods=['POST'])
def calcular():
    datos = request.get_json()
    techo_x = datos.get("techo_x")
    techo_y = datos.get("techo_y")
    panel_a = datos.get("panel_a")
    panel_b = datos.get("panel_b")

    if not all([techo_x, techo_y, panel_a, panel_b]):
        return jsonify({"error": "Por favor, envía todas las dimensiones necesarias."}), 400

    max_paneles = calcular_paneles(techo_x, techo_y, panel_a, panel_b)
    return jsonify({"max_paneles": max_paneles})

if __name__ == '__main__':
    app.run(debug=True)
