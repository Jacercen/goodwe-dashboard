# ☀️ Solar Monitor

Dashboard web para la monitorización de una instalación fotovoltaica **GoodWe**.

La aplicación muestra en una única interfaz el estado actual de la instalación, incluyendo producción solar, consumo, batería, intercambio con la red eléctrica, estadísticas energéticas, gráficas históricas y meteorología.

El proyecto está desarrollado con **React + Vite** y consume una API backend encargada de comunicarse con **GoodWe SEMS Portal**.

## ✨ Funcionalidades

- Monitorización de la producción solar en tiempo real.
- Visualización del consumo actual de la instalación.
- Estado y porcentaje de carga de la batería.
- Visualización del flujo energético entre:
  - Paneles solares.
  - Vivienda.
  - Batería.
  - Red eléctrica.
- Potencia importada o exportada a la red.
- Resumen energético diario.
- Estadísticas de:
  - Producción.
  - Consumo.
  - Autoconsumo.
  - Energía importada de la red.
  - Energía exportada.
  - Carga y descarga de batería.
- Gráfica diaria de potencia.
- Información técnica de la instalación y del inversor.
- Meteorología actual mediante Open-Meteo.
- Diseño responsive adaptado a diferentes tamaños de pantalla.

## 🛠️ Tecnologías

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Icons
- CSS

### APIs y servicios

- GoodWe SEMS Portal API
- Open-Meteo API

## 📋 Requisitos

Para ejecutar el frontend necesitas:

- Node.js 20 o superior.
- npm.
- El backend de GoodWe ejecutándose y accesible desde la aplicación.

Durante el desarrollo, el frontend utiliza un proxy de Vite para redirigir las peticiones realizadas a:

```text
/api
```

hacia el backend local.

## 🚀 Instalación

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entra en la carpeta del proyecto:

```bash
cd goodwe-dashboard
```

Instala las dependencias:

```bash
npm install
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

## 🌐 Acceso desde la red local

Para permitir que otros dispositivos conectados a la misma red puedan acceder al dashboard:

```bash
npm run dev -- --host
```

Vite mostrará una dirección de red similar a:

```text
http://192.168.X.X:5173
```

Esta dirección puede abrirse desde otro ordenador, móvil, tablet o dispositivo conectado a la misma red local.

Puede ser necesario permitir el acceso a Vite a través del firewall del sistema.

## ⚙️ Configuración de Vite

El proyecto utiliza un proxy para comunicar el frontend con el backend durante el desarrollo.

Ejemplo:

```js
server: {
  host: "0.0.0.0",

  proxy: {
    "/api": {
      target: "http://localhost:8080",
      changeOrigin: true,
    },
  },
}
```

Gracias a esta configuración, el frontend puede realizar peticiones utilizando rutas relativas:

```text
/api/goodwe
```

sin tener que incluir directamente la dirección IP del servidor.

## 📡 API del backend

El frontend consume los siguientes endpoints principales:

### Dashboard

```http
GET /api/goodwe/dashboard
```

Devuelve la información principal necesaria para construir el dashboard:

- Información de la planta.
- Datos del inversor.
- Producción solar actual.
- Consumo actual.
- Estado de la batería.
- Intercambio con la red.

### Estadísticas

```http
GET /api/goodwe/statistics
```

Devuelve estadísticas energéticas como:

```json
{
  "generatedToday": 0,
  "totalGeneration": 0,
  "consumedToday": 0,
  "selfConsumption": 0,
  "selfConsumptionPercentage": 0,
  "importedFromGrid": 0,
  "importedFromGridPercentage": 0,
  "exportedToGrid": 0,
  "exportedToGridPercentage": 0,
  "batteryCharge": 0,
  "batteryDischarge": 0
}
```

### Gráfica de potencia

```http
GET /api/goodwe/charts/power?date=YYYY-MM-DD
```

Devuelve los datos utilizados para representar la evolución diaria de:

- Producción solar.
- Consumo.
- Batería.
- Red eléctrica.
- Estado de carga de la batería.

### Gráfica de generación

```http
GET /api/goodwe/charts/generation?range=DAY&date=YYYY-MM-DD
```

Permite consultar datos históricos de generación utilizando diferentes rangos temporales.

## 🌤️ Meteorología

La aplicación utiliza la API pública de **Open-Meteo** para mostrar información meteorológica.

El proceso consiste en:

1. Buscar las coordenadas de la localidad mediante la API de geocodificación.
2. Consultar el tiempo actual utilizando esas coordenadas.

Actualmente se muestran datos como:

- Temperatura.
- Humedad.
- Velocidad del viento.
- Estado meteorológico.

Open-Meteo no requiere una API Key para las consultas utilizadas actualmente por el proyecto.

## 📁 Estructura del proyecto

```text
src/
├── api/
│   ├── goodweApi.js
│   └── weatherApi.js
│
├── components/
│   ├── battery/
│   ├── cards/
│   ├── charts/
│   ├── energy-flow/
│   ├── header/
│   ├── plant/
│   ├── summary/
│   └── weather/
│
├── pages/
│   └── Dashboard.jsx
│
└── styles/
    ├── base/
    ├── components/
    └── pages/
```

## 📜 Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run dev -- --host` | Inicia el servidor accesible desde la red local |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Ejecuta localmente la compilación de producción |
| `npm run lint` | Analiza el código mediante ESLint |

## 🔐 Seguridad

Las credenciales necesarias para acceder a GoodWe SEMS Portal deben gestionarse exclusivamente desde el backend.

El frontend no debe contener:

- Usuario de GoodWe.
- Contraseña de GoodWe.
- Tokens de autenticación.
- Credenciales privadas.

Estas credenciales nunca deben incluirse directamente en el repositorio.

## ⚠️ Notas sobre la API de GoodWe

Este proyecto utiliza endpoints de GoodWe SEMS Portal para obtener información de la instalación.

La API utilizada puede cambiar y algunos endpoints no forman parte necesariamente de una API pública oficialmente documentada. Por este motivo, futuras modificaciones de SEMS Portal podrían requerir cambios en la integración.

Actualmente, el campo de potencia de batería recibido dentro del flujo energético utiliza el nombre:

```text
bettery
```

El frontend mantiene temporalmente este nombre para respetar el contrato actual con el backend.

## 🚧 Estado del proyecto

El proyecto se encuentra en desarrollo.

Entre las mejoras previstas se encuentran:

- Mejorar la representación visual del flujo energético.
- Detectar dinámicamente la dirección del flujo de la red.
- Mejorar la visualización del flujo de carga y descarga de batería.
- Añadir más estadísticas históricas.
- Mejorar el sistema responsive.
- Añadir actualización automática configurable de los datos.
- Preparar un despliegue permanente para monitorización local.

## 📄 Licencia

Este proyecto ha sido desarrollado con fines personales, educativos y de experimentación con sistemas de monitorización fotovoltaica.
