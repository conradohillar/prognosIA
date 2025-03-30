function report() {
  /*
   * generate_report.js
   *
   * Ejemplo de traducción de generate_report.py a JavaScript (Node.js).
   * Ajusta rutas, modelos y lógica según tu proyecto.
   */

  const fs = require("fs");
  const path = require("path");
  const { OpenAI } = require("openai");
  const config = require("./config.json");

  // 🔹 Configuración de OpenAI
  const API_KEY = config.API_KEY;
  const openai = new OpenAI({ apiKey: API_KEY });

  // 🔹 Directorios y archivos importantes
  const ESTUDIOS_DIR = "./estudios";
  const PACIENTE_DIR = "./paciente";
  const DATA_JSON = path.join(PACIENTE_DIR, "data.json");
  const HISTORIA_ARCHIVO = path.join(PACIENTE_DIR, "historia"); // Puede ser .pdf o .txt
  const RESUMEN_ESTUDIOS = path.join(PACIENTE_DIR, "resumen_estudios.txt");
  const RESUMEN_HISTORIA = path.join(PACIENTE_DIR, "resumen_historia.txt");
  const SUGERENCIAS_JSON = path.join(PACIENTE_DIR, "sugerencias.json");
  const REPORTE_MEDICO_JSON = path.join(PACIENTE_DIR, "reporte_medico.json");
  const METADATA_FILE = path.join(PACIENTE_DIR, "metadata.json");

  /**
   * Verifica si un directorio existe; si no, lo crea.
   */
  function verificarDirectorio(directorio) {
    if (!fs.existsSync(directorio)) {
      fs.mkdirSync(directorio, { recursive: true });
    }
  }

  /**
   * Carga y valida los datos del paciente desde data.json
   */
  function cargarDatosPaciente() {
    verificarDirectorio(PACIENTE_DIR);

    if (!fs.existsSync(DATA_JSON)) {
      console.log("⚠️ No se encontró 'data.json'. Creando uno nuevo...");
      const dataInicial = { nombre: "No definido" };
      fs.writeFileSync(
        DATA_JSON,
        JSON.stringify(dataInicial, null, 2),
        "utf-8"
      );
      return null;
    }

    try {
      const contenido = fs.readFileSync(DATA_JSON, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      console.log(`⚠️ Error al leer el archivo JSON: ${error}`);
      return null;
    }
  }

  /**
   * Carga el contenido de un resumen (texto) si existe; caso contrario, retorna vacío.
   */
  function cargarResumen(rutaResumen) {
    if (fs.existsSync(rutaResumen)) {
      return fs.readFileSync(rutaResumen, "utf-8");
    }
    return "";
  }

  /**
   * Carga la última sugerencia de estudios (si existe SUGERENCIAS_JSON).
   */
  function cargarUltimaSugerencia() {
    if (fs.existsSync(SUGERENCIAS_JSON)) {
      const contenido = fs.readFileSync(SUGERENCIAS_JSON, "utf-8");
      return JSON.parse(contenido);
    }
    return {
      sugerencia: "No hay sugerencias previas",
      medicamentos: "No especificado",
      sintomas: "No especificado",
    };
  }

  /**
   * Genera el reporte médico usando la API de OpenAI y guarda el resultado en reporte_medico.json.
   */
  async function generarReporteMedico(
    datosMedicos,
    resumenEstudios,
    resumenHistoria,
    ultimaSugerencia
  ) {
    const nombre = datosMedicos?.nombre ?? "No especificado";
    const edad = datosMedicos?.edad ?? "No especificado";
    const sexo = datosMedicos?.sexo ?? "No especificado";
    const enfermedades =
      datosMedicos?.enfermedades_cronicas ?? "No especificado";

    const sintomas = ultimaSugerencia?.sintomas ?? "No especificado";
    const medicamentos = ultimaSugerencia?.medicamentos ?? "No especificado";
    const sugerencia =
      ultimaSugerencia?.sugerencia ?? "No hay sugerencias previas";

    const prompt = `
    Basado en la siguiente información del paciente, genera un reporte detallado para el médico. No incluyas información personal, como el nombre del paciente.

    📌 **Datos médicos generales**
    - Nombre: ${nombre}
    - Edad: ${edad} años
    - Sexo: ${sexo}
    - Enfermedades crónicas: ${enfermedades}

    🔬 **Síntomas actuales reportados**
    ${sintomas}

    💊 **Medicamentos actuales**
    ${medicamentos}

    📄 **Resumen de estudios médicos previos**
    ${resumenEstudios}

    📖 **Resumen de historia clínica**
    ${resumenHistoria}

    🏥 **Última sugerencia de estudios**
    ${sugerencia}

    🔹 **Genera un reporte profesional estructurado con los puntos clave para el médico.
    Agrega la fecha y despidete unicamente con "PrognosIA". Ten en cuenta contexto clínico y todos los datos que se te brindan.**
    `;

    try {
      // Ajusta el modelo según tus necesidades (por ejemplo: "gpt-3.5-turbo", "gpt-4")
      const response = await openai.responses.create({
        model: "gpt-4o-mini",
        input: prompt,
      });

      const reporte = response.output_text;

      fs.writeFileSync(
        REPORTE_MEDICO_JSON,
        JSON.stringify({ reporte }, null, 2),
        "utf-8"
      );

      return reporte;
    } catch (error) {
      console.error("Error en generarReporteMedico:", error);
      return "";
    }
  }

  /**
   * Función principal: carga datos, genera el reporte, imprime en consola y guarda en reporte_medico.json
   */
  async function main() {
    const datosPaciente = cargarDatosPaciente() || {};

    const resumenEstudios = cargarResumen(RESUMEN_ESTUDIOS);
    const resumenHistoria = cargarResumen(RESUMEN_HISTORIA);

    if (!resumenEstudios) {
      console.log("⚠️ **No se encontraron estudios médicos previos.**");
    }
    if (!resumenHistoria) {
      console.log("⚠️ **No se encontró historia clínica previa.**");
    }

    const ultimaSugerencia = cargarUltimaSugerencia();
    const reporteMedico = await generarReporteMedico(
      datosPaciente,
      resumenEstudios,
      resumenHistoria,
      ultimaSugerencia
    );

    console.log(reporteMedico);
    console.log("📄 **Reporte médico generado en reporte_medico.json**");
  }

  // Ejecutamos la función principal
  main().catch((err) => {
    console.error("Ocurrió un error:", err);
  });
}

module.exports = report;
