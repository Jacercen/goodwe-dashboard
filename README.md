# ☀️ Solar Monitor

Dashboard web para la monitorización de instalaciones fotovoltaicas **GoodWe**.

La aplicación proporciona una interfaz moderna para visualizar en tiempo real el estado de una instalación solar, incluyendo producción fotovoltaica, consumo, almacenamiento en batería, intercambio con la red eléctrica, estadísticas energéticas, gráficas y meteorología.

El proyecto está desarrollado con **React + Vite** y consume una API backend propia encargada de comunicarse con **GoodWe SEMS Portal**.

Actualmente, la aplicación permite iniciar sesión en una cuenta de SEMS Portal, consultar las plantas asociadas y acceder individualmente al dashboard de cada instalación.

---

## 📸 Capturas

> Próximamente.

<!--
Ejemplo para añadir capturas:

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Selección de planta

![Selección de planta](docs/screenshots/plant-selection.png)

### Tema claro

![Tema claro](docs/screenshots/dashboard-light.png)
-->

---

## ✨ Funcionalidades

- Inicio de sesión mediante una cuenta de GoodWe SEMS Portal.
- Consulta automática de las plantas asociadas a la cuenta.
- Selección de la instalación que se desea monitorizar.
- Soporte para cuentas con múltiples plantas.
- Navegación independiente mediante identificador de planta.
- Monitorización de la producción solar en tiempo real.
- Visualización del consumo actual de la instalación.
- Visualización de la potencia importada o exportada de la red.
- Detección automática de instalaciones con y sin batería.
- Estado y porcentaje de carga de la batería cuando está disponible.
- Adaptación automática de la interfaz para instalaciones sin batería.
- Visualización animada del flujo energético entre:
  - Paneles solares.
  - Vivienda o instalación.
  - Batería.
  - Red eléctrica.
- Detección de diferentes flujos energéticos:
  - Solar → Consumo.
  - Solar → Batería.
  - Solar → Red.
  - Batería → Consumo.
  - Red → Consumo.
- Resumen energético diario.
- Estadísticas de producción y consumo.
- Datos de autoconsumo.
- Energía importada y exportada de la red.
- Información de carga y descarga de batería.
- Gráfica diaria de potencia.
- Visualización independiente de las diferentes series de la gráfica.
- Información técnica de la instalación y del inversor.
- Meteorología actual mediante Open-Meteo.
- Tema claro y oscuro.
- Diseño responsive adaptado a diferentes tamaños de pantalla.
- Actualización automática de los datos del dashboard.

---

## 🛠️ Tecnologías

### Frontend

- React
- React Router
- Vite
- JavaScript
- Axios
- Recharts
- React Icons
- CSS

### APIs y servicios

- GoodWe SEMS Portal API
- Open-Meteo API

---

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

---

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

---

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

---

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

---

## 🔄 Flujo actual de la aplicación

El funcionamiento actual de la aplicación es:

```text
Login
  │
  ▼
GoodWe SEMS Portal
  │
  ▼
Obtención de sesión
  │
  ▼
Listado de plantas
  │
  ▼
Selección de planta
  │
  ▼
Dashboard de la instalación
```

Después de iniciar sesión, la aplicación obtiene las plantas disponibles para la cuenta.

Cada planta dispone de su propio dashboard:

```text
/dashboard/:plantId
```

El identificador de la planta se utiliza para solicitar al backend los datos correspondientes a esa instalación.

---

## 📡 API del backend

El frontend consume una API backend propia que actúa como intermediaria entre la interfaz y GoodWe SEMS Portal.

### Autenticación

```http
POST /api/goodwe/login
```

Permite iniciar una sesión con GoodWe SEMS Portal.

---

### Estado de autenticación

```http
GET /api/goodwe/auth/status
```

Permite comprobar si actualmente existe una sesión activa con GoodWe.

---

### Listado de plantas

```http
GET /api/goodwe/plants
```

Devuelve las instalaciones disponibles para la cuenta autenticada.

---

### Dashboard de una planta

```http
GET /api/goodwe/plants/{plantId}/dashboard
```

Devuelve la información principal necesaria para construir el dashboard de una instalación concreta:

- Información de la planta.
- Información del inversor.
- Producción solar actual.
- Consumo actual.
- Estado de la batería.
- Intercambio con la red.
- Flujo energético actual.

---

### Estadísticas

```http
GET /api/goodwe/plants/{plantId}/statistics
```

Devuelve estadísticas energéticas de la instalación seleccionada.

Entre los datos disponibles se encuentran:

- Producción diaria.
- Producción total.
- Consumo.
- Autoconsumo.
- Importación desde la red.
- Exportación a la red.
- Carga de batería.
- Descarga de batería.

---

### Gráfica de potencia

```http
GET /api/goodwe/plants/{plantId}/charts/power?date=YYYY-MM-DD
```

Devuelve los datos utilizados para representar la evolución diaria de:

- Producción solar.
- Consumo.
- Batería.
- Red eléctrica.
- Estado de carga de la batería.

Las series disponibles pueden mostrarse u ocultarse individualmente desde la propia gráfica.

---

### Gráfica de generación

```http
GET /api/goodwe/plants/{plantId}/charts/generation?range=DAY&date=YYYY-MM-DD
```

Permite consultar datos históricos de generación utilizando diferentes rangos temporales.

---

## 🔋 Instalaciones con y sin batería

La aplicación detecta automáticamente si una instalación dispone de almacenamiento mediante la información proporcionada por GoodWe.

Cuando una planta dispone de batería:

- Se muestra el porcentaje de carga.
- Se muestra la potencia actual de carga o descarga.
- Se muestra el estado de la batería.
- Se representa la batería dentro del flujo energético.
- Se muestran las métricas relacionadas con almacenamiento.

Cuando una planta no dispone de batería, estos elementos se eliminan automáticamente y el layout se adapta para aprovechar el espacio disponible.

---

## ⚡ Flujo energético

El dashboard representa visualmente el movimiento actual de la energía entre los diferentes elementos de la instalación.

Los flujos se activan dinámicamente según los datos recibidos desde GoodWe.

Ejemplos:

```text
Solar ──────► Consumo

Solar ──────► Batería

Solar ──────► Red

Batería ────► Consumo

Red ────────► Consumo
```

Las conexiones activas utilizan partículas animadas para facilitar la interpretación visual del comportamiento actual de la instalación.

---

## 📊 Gráfica de potencia

La gráfica diaria permite visualizar la evolución de diferentes valores energéticos a lo largo del día.

Actualmente puede representar:

- Producción solar.
- Consumo.
- Potencia de batería.
- Intercambio con la red.
- Estado de carga de la batería.

Cada serie puede activarse o desactivarse desde la leyenda.

---

## 🌤️ Meteorología

La aplicación utiliza la API pública de **Open-Meteo** para mostrar información meteorológica.

El proceso consiste en:

1. Buscar las coordenadas de la localidad mediante la API de geocodificación.
2. Consultar las condiciones meteorológicas actuales utilizando esas coordenadas.

Actualmente se muestran datos como:

- Temperatura.
- Humedad.
- Velocidad del viento.
- Estado meteorológico.

Open-Meteo no requiere una API Key para las consultas utilizadas actualmente por el proyecto.

---

## 🎨 Interfaz

La aplicación dispone de:

- Tema oscuro.
- Tema claro.
- Paleta visual orientada al sector energético.
- Diseño adaptable a instalaciones con y sin batería.
- Layout optimizado para pantallas de monitorización.
- Diseño responsive para diferentes resoluciones.

La preferencia de tema se almacena localmente en el navegador.

---

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
│   ├── Dashboard.jsx
│   ├── LoginPage.jsx
│   └── PlantSelectionPage.jsx
│
├── styles/
│   ├── base/
│   ├── components/
│   └── pages/
│
├── App.jsx
└── main.jsx
```

---

## 📜 Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run dev -- --host` | Inicia el servidor accesible desde la red local |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Ejecuta localmente la compilación de producción |
| `npm run lint` | Analiza el código mediante ESLint |

---

## 🔐 Seguridad

Las credenciales necesarias para acceder a GoodWe SEMS Portal se gestionan exclusivamente desde el backend.

El frontend no almacena directamente:

- Tokens internos de GoodWe.
- Credenciales privadas dentro del código fuente.
- Información sensible dentro del repositorio.

> La arquitectura de autenticación actual se encuentra todavía en desarrollo y no está preparada para un entorno multiusuario de producción.

Entre las mejoras previstas se encuentra la implementación de un sistema propio de usuarios, clientes, plantas autorizadas y dispositivos.

---

## ⚠️ Notas sobre la API de GoodWe

Este proyecto utiliza endpoints de GoodWe SEMS Portal para obtener información de las instalaciones.

Algunos de los endpoints utilizados no forman parte necesariamente de una API pública oficialmente documentada.

Por este motivo:

- Los endpoints pueden cambiar.
- La estructura de las respuestas puede modificarse.
- Algunas propiedades contienen nombres inconsistentes.
- Futuras versiones de SEMS Portal podrían requerir cambios en la integración.

El backend actúa como capa intermedia para normalizar estas respuestas antes de enviarlas al frontend.

Por ejemplo, algunos datos recibidos desde GoodWe utilizan nombres inconsistentes como:

```text
bettery
```

El backend normaliza estos valores para que el frontend trabaje con nombres consistentes como:

```text
battery
```

---

## 🚧 Estado del proyecto

El proyecto se encuentra actualmente en desarrollo.

### Implementado

- Integración con GoodWe SEMS Portal.
- Autenticación con GoodWe.
- Soporte para cuentas con múltiples plantas.
- Selección de instalaciones.
- Dashboard independiente por planta.
- Monitorización en tiempo real.
- Flujo energético animado.
- Soporte para instalaciones con batería.
- Soporte para instalaciones sin batería.
- Estadísticas energéticas.
- Gráfica diaria de potencia.
- Meteorología.
- Tema claro y oscuro.
- Diseño responsive.

### Próximas mejoras

- Implementar una base de datos propia.
- Crear un modelo de clientes y plantas.
- Añadir autenticación propia de la plataforma.
- Asociar cada cliente únicamente con sus instalaciones.
- Implementar autorización de acceso a plantas.
- Añadir dispositivos autorizados.
- Evitar el acceso a instalaciones no asignadas.
- Mejorar la gestión de sesiones con GoodWe.
- Añadir más estadísticas históricas.
- Preparar el despliegue en producción.
- Optimizar la aplicación para pantallas de monitorización permanentes.

---

## 🗺️ Arquitectura prevista

La arquitectura futura del proyecto permitirá utilizar una única plataforma para diferentes clientes e instalaciones.

```text
Cliente / dispositivo
        │
        ▼
Solar Monitor Frontend
        │
        ▼
Solar Monitor Backend
        │
        ├── Autenticación
        ├── Clientes
        ├── Plantas autorizadas
        └── Dispositivos
        │
        ▼
GoodWe SEMS Portal
```

El objetivo es que cada cliente pueda acceder únicamente a las instalaciones que tenga asignadas, independientemente de que varias plantas estén gestionadas desde una misma cuenta de GoodWe.

---

## 📄 Licencia

Este proyecto ha sido desarrollado inicialmente con fines personales, educativos y de experimentación con sistemas de monitorización fotovoltaica.

Actualmente se encuentra evolucionando hacia una plataforma de monitorización de instalaciones solares con soporte para múltiples plantas y clientes.
