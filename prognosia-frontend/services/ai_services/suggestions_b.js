async function suggest(medicamentos, sintomas) {
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

  const { OpenAI } = require("openai");
  const config = require("./config.json");
  1;
  // 🔹 Configuración de OpenAI
  const API_KEY = config.API_KEY;

  // Instancia de OpenAI
  const client = new OpenAI({ apiKey: API_KEY });

  const patient_data = {
    nombre: "Juan Pérez",
    edad: 45,
    genero: "Masculino",
    altura: 1.75,
    peso: 802,
    alergias: ["Ninguna alergia"],
    condiciones: ["Hipertensión"],
    enfermedades_cronicas: ["Diabetes tipo 2"],
    ejercicio_fisico: "3 veces por semana",
    factores_de_riesgo: ["Tabaquismo"],
    historial_familiar: {
      diabetes: "madre",
      hipertension: "padre",
    },
    diagnosticos_previos: ["Gripe", "Apendicitis"],
  };

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

  // ─────────────────────────────────────────────────────────────────────────────
  // ──────────────── 4. ACTUALIZAR RESUMEN DE ESTUDIOS ─────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────────────────────────
  // ──────────────── 5. ACTUALIZAR RESUMEN DE HISTORIA ─────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────────────────────────
  // ──────────────── 6. CARGAR DATOS PACIENTE DESDE JSON ───────────────────────
  // ─────────────────────────────────────────────────────────────────────────────

  // ─────────────────────────────────────────────────────────────────────────────
  // ──────────────── 7. GENERAR RESUMEN VIA OPENAI ─────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  async function generarResumenIA(contenido) {
    const model = "gpt-4o-mini"; // o "gpt-4", etc.

    const messages = `Genera un resumen claro y breve de este contenido:\n\n${contenido}`;

    try {
      const response = await client.responses.create({
        model: model,
        input: messages,
      });
      // Retorna el texto de la respuesta
      return response.output_text;
    } catch (error) {
      console.error("Error en generarResumenIA:", error);
      return "";
    }
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
    - Enfermedades crónicas: ${
      datosMedicos?.enfermedades_cronicas ?? "No especificado"
    }

    💊 **Medicamentos actuales**
    ${medicamentos}

    🔬 **Síntomas actuales reportados**
    ${sintomas}

    📄 **Resumen de estudios médicos previos**
    ${resumenEstudios}

    📖 **Resumen de historia clínica**
    ${resumenHistoria}

    El formato de la respuesta debe ser en Markdown, muy importante que sea asi. Responde con una lista de estudios sugeridos (no mas de 2 o 3 estudios, los mas importantes), su breve descripción y por qué son importantes. 
    Ten en cuenta tanto los datos clínicos, personales, síntomas y medicamentos, como la frecuencia recomendada para el grupo del paciente.
    Evita alarmar al paciente e intenta mantener el lenguaje sencillo. Evita cualquier saludo o despedida.
    `;

    try {
      const response = await client.responses.create({
        model: model,
        input: prompt,
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
    // Esto es el hardcodeo mas bostero que hice en mi vida
    let resumenEstudiosContenido =
      "Laboratorio Clínico - Análisis de Sangre - Paciente: Juan Pérez - Edad: 44 años - Fecha: 15 de marzo de 2024 - Resultados: - Glucosa: 102 mg/dL (Referencia: 70-100 mg/dL) - Colesterol Total: 210 mg/dL (Referencia: Desirable: <200 mg/dL) - Triglicéridos: 160 mg/dL (Referencia: Normal: <150 mg/dL) - Hemoglobina: 14.2 g/dL (Referencia: Hombres: 13.8-17.2 g/dL) - Plaquetas: 230,000 /μL (Referencia: 150,000-450,000 /μL) - Glóbulos Blancos: 7,200 /μL (Referencia: 4,500-11,000 /μL) - Nota: Consulte a su médico para interpretar estos resultados." +
      "Laboratorio Clínico - Análisis de Sangre - Paciente: Juan Pérez - Edad: 45 años - Fecha: 28 de marzo de 2025 - Resultados: - Glucosa: 95 mg/dL (Referencia: 70-100 mg/dL) - Colesterol Total: 190 mg/dL (Referencia: Desirable: <200 mg/dL) - Triglicéridos: 135 mg/dL (Referencia: Normal: <150 mg/dL) - Hemoglobina: 14.5 g/dL (Referencia: Hombres: 13.8-17.2 g/dL) - Plaquetas: 250,000 /μL (Referencia: 150,000-450,000 /μL) - Glóbulos Blancos: 6,800 /μL (Referencia: 4,500-11,000 /μL) - Nota: Consulte a su médico para interpretar estos resultados.";

    let resumenHistoriaContenido =
      "Consulta Médica - Informe - Paciente: Juan Pérez - Edad: 44 años - Fecha: 15 de marzo de 2024 - Diagnóstico: - El paciente presenta niveles de colesterol y triglicéridos elevados, indicando riesgo de dislipidemia. - Se recomienda mejorar la alimentación y realizar seguimiento médico. - Recomendaciones: - Reducir consumo de grasas saturadas y azúcares. - Incorporar actividad física regular. - Control de presión arterial y colesterol en 6 meses. - Consultar al nutricionista para plan alimenticio adecuado. - Dr. Ricardo Gómez - Médico Clínico" +
      "Consulta Médica - Informe - Paciente: Juan Pérez - Edad: 45 años - Fecha: 28 de marzo de 2025 - Diagnóstico: - El paciente presenta niveles de colesterol dentro del rango normal, pero con triglicéridos - ligeramente elevados. Se recomienda mejorar hábitos alimenticios y aumentar actividad física. - Recomendaciones: - Seguir una dieta baja en grasas saturadas y azúcares. - Realizar actividad física al menos 30 minutos al día. - Repetir análisis en 3 meses para seguimiento. - Consultar nuevamente si hay síntomas como fatiga o mareos. - Dr. Ricardo Gómez - Médico Clínico";

    // Genera un nuevo resumen con la IA para cada uno
    const resumenEstudios = await generarResumenIA(resumenEstudiosContenido);
    const resumenHistoria = await generarResumenIA(resumenHistoriaContenido);

    // Solicita sugerencias de estudios con toda la data
    const resultado = await sugerirEstudios(
      patient_data,
      medicamentos,
      sintomas,
      resumenEstudios,
      resumenHistoria
    );

    console.log("\n📋 **Estudios sugeridos:**\n");
    console.log(resultado);
    return resultado;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // ──────────────── 11. EJECUCIÓN DE LA FUNCIÓN PRINCIPAL ─────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  try {
    const result = await main(medicamentosArg, sintomasArg);
    return result; // Return the result of `main()`
  } catch (err) {
    console.error("Ocurrió un error:", err);
    throw err; // Optionally rethrow the error if you need to handle it outside
  }
}

module.exports = suggest;
