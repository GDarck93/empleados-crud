# Copilot Instructions for empleados-crud

## Arquitectura general
- Proyecto frontend basado en React + Vite.
- La estructura principal está en `src/` con subcarpetas para vistas (`views/`), servicios (`services/`), componentes (`components/`), y recursos (`assets/`).
- El flujo de datos se gestiona principalmente mediante hooks de React (`useState`, `useEffect`).
- Los servicios de datos se centralizan en archivos dentro de `src/services/`, usando `axios` para llamadas HTTP.
- Ejemplo: `readEmpleados` en `empleadoService.js` obtiene datos de empleados desde MockAPI.

## Convenciones y patrones
- Los servicios se importan y consumen en las vistas, por ejemplo, `EmpleadosView.jsx` usa `readEmpleados`.
- Los componentes de vista se ubican en `src/views/` y suelen ser funcionales.
- Los componentes reutilizables deben ir en `src/components/` (actualmente vacío).
- Los estilos se gestionan con archivos CSS en `src/`.
- El proyecto usa módulos ES y sintaxis moderna de React (v19+).

## Workflows de desarrollo
- **Desarrollo local:**
  - `npm run dev` inicia el servidor Vite con HMR.
- **Build:**
  - `npm run build` genera la versión de producción.
- **Lint:**
  - `npm run lint` ejecuta ESLint según la configuración en `eslint.config.js`.
- **Preview:**
  - `npm run preview` sirve el build para pruebas finales.

## Integraciones y dependencias
- `axios` para peticiones HTTP.
- `react` y `react-dom` como base de la UI.
- Plugins de Vite y ESLint para desarrollo y calidad de código.
- No hay integración backend directa; los datos se obtienen de MockAPI.

## Ejemplo de flujo de datos
1. Vista (`EmpleadosView.jsx`) importa y llama a un servicio (`readEmpleados`).
2. El servicio (`empleadoService.js`) usa `axios` para obtener datos y retorna el resultado.
3. La vista gestiona el estado y renderiza la información.

## Recomendaciones para agentes
- Centraliza la lógica de datos en `src/services/`.
- Mantén los componentes reutilizables en `src/components/`.
- Usa hooks para el manejo de estado y efectos.
- Sigue la estructura de carpetas para mantener la organización.
- Consulta `package.json` para scripts y dependencias clave.

## Archivos clave
- `src/services/empleadoService.js`: patrón de servicios de datos.
- `src/views/EmpleadosView.jsx`: patrón de consumo de servicios y gestión de estado.
- `package.json`: scripts y dependencias.
- `eslint.config.js`: reglas de linting.

---
¿Hay algún aspecto que requiera mayor detalle o alguna convención que no esté clara? Indica si necesitas ejemplos adicionales o explicación de algún flujo específico.