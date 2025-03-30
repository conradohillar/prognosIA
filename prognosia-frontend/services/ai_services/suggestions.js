 function suggest(medicamentos, sintomas){
    /* 
    * suggestions.js
    * 
    * Ejemplo de traducción de suggestions.py (Python) a JavaScript (Node.js).
    * 
    * Instalaciones necesarias (vía npm):
    *  npm install openai pdf-parse csv-parse fs path
    *
    * Ajusta las rutas, modelos y lógicas según sea necesario.
    */

    const fs = require("fs");
    const path = require("path");
    const { OpenAI } = require("openai");
    const pdfParse = require("pdf-parse");
    const { parse } = require("csv-parse/sync");
    const config = require("./config.json");1
    // 🔹 Configuración de OpenAI
    const API_KEY = config.API_KEY;

    // Instancia de OpenAI
    const client = new OpenAI({ apiKey: API_KEY})


    // 🔹 Directorios y archivos importantes
    const ESTUDIOS_DIR = "./estudios";
    const PACIENTE_DIR = "./paciente";
    const DATA_JSON = path.join(PACIENTE_DIR, "data.json");
    const HISTORIA_ARCHIVO = path.join(PACIENTE_DIR, "historia");  // Puede ser .pdf o .txt
    const RESUMEN_ESTUDIOS = path.join(PACIENTE_DIR, "resumen_estudios.txt");
    const RESUMEN_HISTORIA = path.join(PACIENTE_DIR, "resumen_historia.txt");
    const SUGERENCIAS_JSON = path.join(PACIENTE_DIR, "sugerencias.json");
    const METADATA_FILE = path.join(PACIENTE_DIR, "metadata.json");

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 1. OBTENCIÓN DE PARÁMETROS DESDE LA CLI ───────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    // if (process.argv.length < 4) {
    // console.log("⚠️ Uso: node suggestions.js \"<medicamentos>\" \"<sintomas>\"");
    // process.exit(1);
    // }
    const medicamentosArg = medicamentos || "";
    const sintomasArg = sintomas || "";

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 2. FUNCIONES AUXILIARES ──────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────

    // Verificar/crear directorio si no existe
    function verificarDirectorio(directorio) {
    if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio, { recursive: true });
    }
    }

    // Cargar metadata desde METADATA_FILE
    function obtenerMetadata() {
    if (fs.existsSync(METADATA_FILE)) {
        const contenido = fs.readFileSync(METADATA_FILE, "utf-8");
        return JSON.parse(contenido);
    }
    return {};
    }

    // Guardar metadata en METADATA_FILE
    function guardarMetadata(metadata) {
    fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2), "utf-8");
    }

    // Obtener fecha de modificación de un archivo (en milisegundos)
    function obtenerFechaModificacion(archivo) {
    try {
        return fs.statSync(archivo).mtimeMs;
    } catch (error) {
        return 0;
    }
    }

    // Verificar si algún archivo en un directorio cambió después de cierta marca de tiempo
    function archivosCambiaron(directorio, ultimaActualizacion) {
    if (!fs.existsSync(directorio)) return false;
    const archivos = fs.readdirSync(directorio);
    return archivos.some(archivo => {
        const rutaArchivo = path.join(directorio, archivo);
        return obtenerFechaModificacion(rutaArchivo) > ultimaActualizacion;
    });
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 3. EXTRACCIÓN DE TEXTO DE ARCHIVOS ────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    async function extraerTextoArchivo(rutaArchivo) {
    if (!fs.existsSync(rutaArchivo)) return "";

    if (rutaArchivo.endsWith(".pdf")) {
        // PDF
        const data = fs.readFileSync(rutaArchivo);
        try {
        const pdfData = await pdfParse(data);
        return pdfData.text;
        } catch (error) {
        console.error("Error al procesar PDF:", error);
        return "";
        }
    } else if (rutaArchivo.endsWith(".txt")) {
        // TXT
        return fs.readFileSync(rutaArchivo, "utf-8").trim();
    } else if (rutaArchivo.endsWith(".csv")) {
        // CSV
        const contenido = fs.readFileSync(rutaArchivo, "utf-8");
        const registros = parse(contenido);
        // Unir filas con comas
        return registros.map(row => row.join(", ")).join("\n");
    }

    return "";
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 4. ACTUALIZAR RESUMEN DE ESTUDIOS ─────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    async function actualizarResumenEstudios(metadata) {
    const ultimaActualizacion = metadata.ultima_actualizacion_estudios || 0;

    if (archivosCambiaron(ESTUDIOS_DIR, ultimaActualizacion)) {
        // Extraer texto de todos los archivos en ESTUDIOS_DIR y concatenarlos
        const archivos = fs.readdirSync(ESTUDIOS_DIR);
        let textoTotal = "";

        for (const archivo of archivos) {
        const rutaArchivo = path.join(ESTUDIOS_DIR, archivo);
        const texto = await extraerTextoArchivo(rutaArchivo);
        textoTotal += texto;
        }

        // Limitar a 8000 caracteres
        const textoLimitado = textoTotal.slice(0, 8000);
        fs.writeFileSync(RESUMEN_ESTUDIOS, textoLimitado, "utf-8");

        metadata.ultima_actualizacion_estudios = Date.now();
        guardarMetadata(metadata);
    }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 5. ACTUALIZAR RESUMEN DE HISTORIA ─────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    async function actualizarResumenHistoria(metadata) {
    const historiaTxt = HISTORIA_ARCHIVO + ".txt";
    const historiaPdf = HISTORIA_ARCHIVO + ".pdf";
    const ultimaActualizacion = metadata.ultima_actualizacion_historia || 0;

    const modTxt = obtenerFechaModificacion(historiaTxt);
    const modPdf = obtenerFechaModificacion(historiaPdf);

    // Si cualquiera de estos archivos es más reciente que la última actualización
    if (modTxt > ultimaActualizacion || modPdf > ultimaActualizacion) {
        let texto = "";
        if (fs.existsSync(historiaPdf)) {
        texto = await extraerTextoArchivo(historiaPdf);
        } else if (fs.existsSync(historiaTxt)) {
        texto = await extraerTextoArchivo(historiaTxt);
        }
        // Limitar a 8000 chars
        const textoLimitado = texto.slice(0, 8000);
        fs.writeFileSync(RESUMEN_HISTORIA, textoLimitado, "utf-8");

        metadata.ultima_actualizacion_historia = Date.now();
        guardarMetadata(metadata);
    }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 6. CARGAR DATOS PACIENTE DESDE JSON ───────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    function cargarDatosPaciente() {
    verificarDirectorio(PACIENTE_DIR);

    if (!fs.existsSync(DATA_JSON)) {
        console.log("⚠️ No se encontró 'data.json'. Creando uno nuevo...");
        const dataInicial = { nombre: "No definido" };
        fs.writeFileSync(DATA_JSON, JSON.stringify(dataInicial, null, 2), "utf-8");
        return dataInicial;
    }

    try {
        const contenido = fs.readFileSync(DATA_JSON, "utf-8");
        return JSON.parse(contenido);
    } catch (error) {
        console.log("⚠️ Error al leer el archivo JSON:", error);
        return null;
    }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 7. GENERAR RESUMEN VIA OPENAI ─────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    async function generarResumenIA(contenido) {
        const model = "gpt-4o-mini"; // o "gpt-4", etc.

        const messages = `Genera un resumen claro y breve de este contenido:\n\n${contenido}`;

        // Verificar si hay una imagen en el directorio del paciente
        const imagenes = fs.readdirSync(PACIENTE_DIR).filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === ".jpg" || ext === ".jpeg" || ext === ".png";
        });

        if (imagenes.length > 0) {
            const rutaImagen = path.join(PACIENTE_DIR, imagenes[0]); // Tomar la primera imagen encontrada
            try {
                const imagenBuffer = fs.readFileSync(rutaImagen);
                const imagenBase64 = imagenBuffer.toString("base64");
                messages.push( `Además, considera esta imagen codificada en base64:\n\n${imagenBase64}`);
            } catch (error) {
                console.error("Error al codificar la imagen en base64:", error);
            }
        }

        try {
            const response = await client.responses.create({
                model: model,
                input: messages
            });
            // Retorna el texto de la respuesta
            return response.output_text;
        } catch (error) {
            console.error("Error en generarResumenIA:", error);
            return "";
        }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 8. GUARDAR SUGERENCIA EN JSON ─────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    function guardarSugerencia(sugerencia, medicamentos, sintomas) {
    const data = {
        fecha: new Date().toISOString().replace("T", " ").split(".")[0],
        medicamentos: medicamentos,
        sintomas: sintomas,
        sugerencia: sugerencia
    };

    fs.writeFileSync(SUGERENCIAS_JSON, JSON.stringify(data, null, 2, "utf-8"), "utf-8");
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 9. SUGERIR ESTUDIOS VIA OPENAI ────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    async function sugerirEstudios(
    datosMedicos, 
    medicamentos, 
    sintomas, 
    resumenEstudios, 
    resumenHistoria
    ) {
    // Aquí podrías usar GPT-4 si quieres
    const model = "gpt-4o-mini"; // Ajusta según tus necesidades

    const prompt = `
    Basado en la siguiente información resumida del paciente, sugiere una lista de estudios médicos recomendados.

    📌 **Datos médicos generales**
    - Nombre: ${datosMedicos?.nombre ?? "No especificado"}
    - Edad: ${datosMedicos?.edad ?? "No especificado"} años
    - Sexo: ${datosMedicos?.sexo ?? "No especificado"}
    - Enfermedades crónicas: ${datosMedicos?.enfermedades_cronicas ?? "No especificado"}

    💊 **Medicamentos actuales**
    ${medicamentos}

    🔬 **Síntomas actuales reportados**
    ${sintomas}

    📄 **Resumen de estudios médicos previos**
    ${resumenEstudios}

    📖 **Resumen de historia clínica**
    ${resumenHistoria}

    Responde con una lista de estudios sugeridos, su breve descripción y por qué son importantes. 
    Ten en cuenta tanto los datos clínicos, personales, síntomas y medicamentos, como la frecuencia recomendada para el grupo del paciente.
    Evita alarmar al paciente e intenta mantener el lenguaje sencillo. Evita cualquier saludo o despedida.
    `;

    try {
        const response = await client.responses.create({
        model: model,
        input: prompt
        });
        return response.output_text;
    } catch (error) {
        console.error("Error en sugerirEstudios:", error);
        return "";
    }
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 10. FUNCIÓN PRINCIPAL ─────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    async function main(medicamentos, sintomas) {
    const metadata = obtenerMetadata();
    const datosPaciente = cargarDatosPaciente();

    // Actualiza y genera los resúmenes en disco
    await actualizarResumenEstudios(metadata);
    await actualizarResumenHistoria(metadata);

    // Carga el contenido actual de los resúmenes
    let resumenEstudiosContenido = "";
    let resumenHistoriaContenido = "";

    if (fs.existsSync(RESUMEN_ESTUDIOS)) {
        resumenEstudiosContenido = fs.readFileSync(RESUMEN_ESTUDIOS, "utf-8");
    }
    if (fs.existsSync(RESUMEN_HISTORIA)) {
        resumenHistoriaContenido = fs.readFileSync(RESUMEN_HISTORIA, "utf-8");
    }

    // Genera un nuevo resumen con la IA para cada uno
    const resumenEstudios = await generarResumenIA(resumenEstudiosContenido);
    const resumenHistoria = await generarResumenIA(resumenHistoriaContenido);

    // Solicita sugerencias de estudios con toda la data
    const resultado = await sugerirEstudios(
        datosPaciente,
        medicamentos,
        sintomas,
        resumenEstudios,
        resumenHistoria
    );

    // Guarda la sugerencia en un JSON
    guardarSugerencia(resultado, medicamentos, sintomas);

    console.log("\n📋 **Estudios sugeridos:**\n");
    console.log(resultado);
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // ──────────────── 11. EJECUCIÓN DE LA FUNCIÓN PRINCIPAL ─────────────────────
    // ─────────────────────────────────────────────────────────────────────────────
    main(medicamentosArg, sintomasArg)
    .then(() => {
        // Éxito
    })
    .catch((err) => {
        console.error("Ocurrió un error:", err);
    });
}

module.exports = suggest;