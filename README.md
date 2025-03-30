# prognosIA

Es una aplicación cuyo objetivo principal es brindar una herramienta basada en inteligencia artificial para simplificar y agilizar el proceso de diagnóstico de pacientes. La misma permite centralizar la historia clínica del paciente y luego usa esta información para analizar la salud del paciente con mayor precisión.

# NOTA:

Debido a la limitación temporal se decidió que todas las pruebas sean realizadas en un dispositivo iOS con el fin de lograr consistencia.

## Instalación y ejecución

Seguí estos pasos para instalar y ejecutar el proyecto:

1. Cloná el repositorio:

   ```sh
   git clone git@github.com:conradohillar/prognosIA.git
   ```

2. Accedé a la carpeta del proyecto:

   ```sh
   cd prognosIA/prognosia-frontend
   ```

3. Instalá las dependencias:

   ```sh
   npm install
   ```

4. Configuración del proyecto:

   ```
   Colocar el contenido provisto del archivo config.json en /prognosia-frontend/services/ai_services/config.json
   ```

5. Iniciá el proyecto en Expo:
   ```sh
   npx expo start -c
   ```

Esto limpiará la caché y abrirá el entorno de desarrollo de Expo, permitiéndote probar la aplicación en un emulador o dispositivo físico.

## Requisitos previos

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- [Expo CLI](https://docs.expo.dev/) (se instalará automáticamente si no lo tienes)
- Un emulador de Android/iOS o la app Expo Go en tu dispositivo móvil
