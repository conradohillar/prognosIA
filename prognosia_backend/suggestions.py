import openai
import pdfplumber
import json
import os
import re
import csv
import sys
from datetime import datetime
from config import API_KEY
from PIL import Image

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
METADATA_FILE = os.path.join(PACIENTE_DIR, "metadata.json")

# 🔹 Validar entrada de parámetros en ejecución
if len(sys.argv) < 3:
    print("⚠️ Uso: python suggestions.py \"medicamentos\" \"sintomas\"")
    sys.exit(1)

# Función para detectar imágenes en el directorio de estudios
def detectar_imagenes():
    return [f for f in os.listdir(ESTUDIOS_DIR) if f.lower().endswith((".png", ".jpg", ".jpeg"))]

def verificar_directorio(directorio):
    if not os.path.exists(directorio):
        os.makedirs(directorio)

def obtener_metadata():
    if os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    return {}

def guardar_metadata(metadata):
    with open(METADATA_FILE, "w", encoding="utf-8") as file:
        json.dump(metadata, file, indent=4)

def obtener_fecha_modificacion(archivo):
    return os.path.getmtime(archivo) if os.path.exists(archivo) else 0

def archivos_cambiaron(directorio, ultima_actualizacion):
    for archivo in os.listdir(directorio):
        ruta_archivo = os.path.join(directorio, archivo)
        if obtener_fecha_modificacion(ruta_archivo) > ultima_actualizacion:
            return True
    return False

# 🔹 Función para extraer texto de archivos PDF
def extraer_texto_archivo(ruta_archivo):
    if ruta_archivo.endswith(".pdf"):
        with pdfplumber.open(ruta_archivo) as pdf:
            return "\n".join([pagina.extract_text() for pagina in pdf.pages if pagina.extract_text()])
    elif ruta_archivo.endswith(".txt"):
        with open(ruta_archivo, "r", encoding="utf-8") as file:
            return file.read().strip()
    elif ruta_archivo.endswith(".csv"):
        with open(ruta_archivo, "r", encoding="utf-8") as file:
            return "\n".join([", ".join(row) for row in csv.reader(file)])
    return ""

# 🔹 Función para actualizar el resumen de estudios (TXT, CSV o PDF)
def actualizar_resumen_estudios(metadata):
    if archivos_cambiaron(ESTUDIOS_DIR, metadata.get("ultima_actualizacion_estudios", 0)):
        texto_total = "".join(extraer_texto_archivo(os.path.join(ESTUDIOS_DIR, archivo)) for archivo in os.listdir(ESTUDIOS_DIR))
        with open(RESUMEN_ESTUDIOS, "w", encoding="utf-8") as file:
            file.write(texto_total[:8000])
        metadata["ultima_actualizacion_estudios"] = datetime.now().timestamp()
        guardar_metadata(metadata)

def actualizar_resumen_historia(metadata):
    historia_txt = HISTORIA_ARCHIVO + ".txt"
    historia_pdf = HISTORIA_ARCHIVO + ".pdf"
    archivos = [historia_pdf, historia_txt]
    
    if any(obtener_fecha_modificacion(a) > metadata.get("ultima_actualizacion_historia", 0) for a in archivos):
        texto = extraer_texto_archivo(historia_pdf) if os.path.exists(historia_pdf) else extraer_texto_archivo(historia_txt)
        with open(RESUMEN_HISTORIA, "w", encoding="utf-8") as file:
            file.write(texto[:8000])
        metadata["ultima_actualizacion_historia"] = datetime.now().timestamp()
        guardar_metadata(metadata)

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

def generar_resumen_ia(resumen):
    imagenes = detectar_imagenes()
    model = "gpt-4o" if imagenes else "gpt-4o-mini"

    with open(RESUMEN_ESTUDIOS, "r", encoding="utf-8") as file:
        contenido = file.read()
    
    messages = [{"role": "user", "content": f"Genera un resumen claro y breve de este contenido: {contenido}"}]
    
    if imagenes:
        for img in imagenes:
            with open(os.path.join(ESTUDIOS_DIR, img), "rb") as image_file:
                messages.append({"role": "user", "content": {"type": "image", "image": image_file.read()}})
    
    response = client.chat.completions.create(model=model, messages=messages)
    return response.choices[0].message.content

def guardar_sugerencia(sugerencia, medicamentos, sintomas):
    data = {
        "fecha": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "medicamentos": medicamentos,
        "sintomas": sintomas,
        "sugerencia": sugerencia
    }
    with open(SUGERENCIAS_JSON, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

# 🔹 Función para solicitar estudios médicos sugeridos
def sugerir_estudios(datos_medicos, medicamentos, sintomas, resumen_estudios, resumen_historia):
    prompt = f"""
    Basado en la siguiente información resumida del paciente, sugiere una lista de estudios médicos recomendados.

    📌 **Datos médicos generales**
    - Nombre: {datos_medicos.get("nombre", "No especificado")}
    - Edad: {datos_medicos.get("edad", "No especificado")} años
    - Sexo: {datos_medicos.get("sexo", "No especificado")}
    - Enfermedades crónicas: {datos_medicos.get("enfermedades_cronicas", "No especificado")}

    💊 **Medicamentos actuales**
    {medicamentos}

    🔬 **Síntomas actuales reportados**
    {sintomas}

    📄 **Resumen de estudios médicos previos**
    {resumen_estudios}

    📖 **Resumen de historia clínica**
    {resumen_historia}

    **Responde con una lista de estudios sugeridos, su breve descripción y por qué son importantes. 
    Estos deben ser faciles de entender por el usuario y no debe ser muy especifico. No debe asustar o hacer preocupar al usuario.
    Ten en cuenta para esto ademas de los datos clinicos, personales, sintomas y medicamentos tambien la frecuencia con la que las
    personas de ese grupo deben realizarse estudios de distintos tipos y la ultima vez que se los haya realizado.
    Tambien debes darle importancia a los sintomas actuales y los datos previos.**
    """
    #**Responde con una lista de estudios sugeridos, sin explicaciones adicionales.**
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

# Ejecutar el programa
def suggest(medicamentos, sintomas):

    if not medicamentos:
        medicamentos = ""
    if not sintomas:
        sintomas = ""

    metadata = obtener_metadata()
    datos_paciente = cargar_datos_paciente()

    actualizar_resumen_estudios(metadata)
    actualizar_resumen_historia(metadata)

    with open(RESUMEN_ESTUDIOS, "r", encoding="utf-8") as file:
        resumen_estudios = generar_resumen_ia(file.read())

    with open(RESUMEN_HISTORIA, "r", encoding="utf-8") as file:
        resumen_historia = generar_resumen_ia(file.read())

    resultado = sugerir_estudios(datos_paciente, medicamentos, sintomas, resumen_estudios, resumen_historia)
    guardar_sugerencia(resultado, medicamentos, sintomas)

    print("\n📋 **Estudios sugeridos:**\n")
    print(resultado)