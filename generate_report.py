import openai
import json
import os
from config import API_KEY

# Configura tu clave de API
client = openai.OpenAI(api_key=API_KEY)

# 🔹 Directorios y archivos importantes
ESTUDIOS_DIR = "./estudios"
PACIENTE_DIR = "./paciente"
DATA_JSON = os.path.join(PACIENTE_DIR, "data.json")
HISTORIA_ARCHIVO = os.path.join(PACIENTE_DIR, "historia")  # Puede ser .pdf o .txt
RESUMEN_ESTUDIOS = os.path.join(PACIENTE_DIR, "resumen_estudios.txt")
RESUMEN_HISTORIA = os.path.join(PACIENTE_DIR, "resumen_historia.txt")
SUGERENCIAS_JSON = os.path.join(PACIENTE_DIR, "sugerencias.json")
REPORTE_MEDICO_JSON = os.path.join(PACIENTE_DIR, "reporte_medico.json")
METADATA_FILE = os.path.join(PACIENTE_DIR, "metadata.json")

def verificar_directorio(directorio):
    if not os.path.exists(directorio):
        os.makedirs(directorio)

# 🔹 Función para cargar y validar los datos del paciente desde JSON
def cargar_datos_paciente():
    verificar_directorio(PACIENTE_DIR)

    if not os.path.exists(DATA_JSON):
        print("⚠️ No se encontró 'data.json'. Creando uno nuevo...")
        with open(DATA_JSON, "w", encoding="utf-8") as file:
            json.dump({"nombre": "No definido"}, file, indent=4)
        return None

    try:
        with open(DATA_JSON, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(f"⚠️ Error al leer el archivo JSON: {e}")
        return None

def cargar_resumen(resumen):
    if os.path.exists(resumen):
        with open(resumen, "r", encoding="utf-8") as file:
            return file.read()
    return ""

def cargar_ultima_sugerencia():
    if os.path.exists(SUGERENCIAS_JSON):
        with open(SUGERENCIAS_JSON, "r", encoding="utf-8") as file:
            return json.load(file)
    return {"sugerencia": "No hay sugerencias previas", "medicamentos": "No especificado", "sintomas": "No especificado"}

# 🔹 Función para generar el reporte para el médico
def generar_reporte_medico(datos_medicos, resumen_estudios, resumen_historia, ultima_sugerencia):
    prompt = f"""
    Basado en la siguiente información del paciente, genera un reporte detallado para el médico.
    
    📌 **Datos médicos generales**
    - Nombre: {datos_medicos.get("nombre", "No especificado")}
    - Edad: {datos_medicos.get("edad", "No especificado")} años
    - Sexo: {datos_medicos.get("sexo", "No especificado")}
    - Enfermedades crónicas: {datos_medicos.get("enfermedades_cronicas", "No especificado")}

    🔬 **Síntomas actuales reportados**
    {ultima_sugerencia.get("sintomas", "No especificado")}

    💊 **Medicamentos actuales**
    {ultima_sugerencia.get("medicamentos", "No especificado")}

    📄 **Resumen de estudios médicos previos**
    {resumen_estudios}

    📖 **Resumen de historia clínica**
    {resumen_historia}

    🏥 **Última sugerencia de estudios**
    {ultima_sugerencia.get("sugerencia", "No hay sugerencias previas")}

    🔹 **Genera un reporte profesional estructurado con los puntos clave para el médico.
    No agregues ningun saludo al final, pero si la fecha. Ten en cuenta contexto clinico y todos los datos que se te brindan.**
    """
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    reporte = response.choices[0].message.content
    
    with open(REPORTE_MEDICO_JSON, "w", encoding="utf-8") as file:
        json.dump({"reporte": reporte}, file, indent=4, ensure_ascii=False)
    
    return reporte

# 🔹 Ejecutar el programa
datos_paciente = cargar_datos_paciente()

resumen_estudios = cargar_resumen(RESUMEN_ESTUDIOS)
resumen_historia = cargar_resumen(RESUMEN_HISTORIA)

if not resumen_estudios:
    print("⚠️ **No se encontraron estudios médicos previos.**")
if not resumen_historia:
    print("⚠️ **No se encontró historia clínica previa.**")

ultima_sugerencia = cargar_ultima_sugerencia()
reporte_medico = generar_reporte_medico(datos_paciente, resumen_estudios, resumen_historia, ultima_sugerencia)

print(reporte_medico)

print("📄 **Reporte médico generado en reporte_medico.json**")