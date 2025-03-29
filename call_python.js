import { useState } from 'react';
import { exec } from 'react-native-exec';

/**
 * Función para llamar al script de Python cuando se presiona un botón.
 * @param {string} medicamentos - Lista de medicamentos.
 * @param {string} sintomas - Lista de síntomas.
 * @returns {object} Estado de la respuesta de la ejecución y función para ejecutarla.
 */
export const useEjecutarPython = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ejecutarPython = async (medicamentos, sintomas) => {
    const medInput = medicamentos ? medicamentos : "";
    const sintInput = sintomas ? sintomas : "";
    
    setLoading(true);
    try {
      const command = `source /venv/bin/activate && python3 suggestions.py "${medInput}" "${sintInput}"`;
      const response = await exec(command);
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, ejecutarPython };
};
