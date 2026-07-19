# Solar Monitor

Panel web para monitorizar una instalación solar GoodWe. Muestra el flujo de energía en tiempo real, estado de batería, producción, consumo, datos de la planta, gráfica diaria de potencia y meteorología de Yecla.

## Requisitos

- Node.js 20 o superior
- npm
- El backend GoodWe disponible en `http://localhost:8080`

## Instalación y ejecución

```bash
npm install
npm run dev
```

Vite mostrará la dirección local de la aplicación, normalmente `http://localhost:5173`.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run lint` | Analiza el código con ESLint. |

## Backend esperado

La aplicación consume el backend desde `http://localhost:8080/api/goodwe` mediante estos endpoints:

- `GET /dashboard`
- `GET /charts/power?date=YYYY-MM-DD`
- `GET /charts/generation?range=...&date=YYYY-MM-DD`

El endpoint del dashboard debe proporcionar, entre otros, datos de `plant`, `inverter` y `powerFlow.data.powerflow`.

> Nota: el campo de potencia de batería se llama `bettery` porque así lo entrega el backend. Se conserva ese nombre en el frontend para respetar el contrato actual de la API.

## Servicios externos

La tarjeta meteorológica consulta la API pública de Open-Meteo. Requiere acceso a Internet para mostrar el tiempo actual.

## Estructura del proyecto

```text
src/
├── api/          Clientes HTTP para GoodWe y meteorología
├── components/   Componentes reutilizables del dashboard
├── pages/        Vistas principales
└── styles/       Estilos globales, de componentes y de página
```

## Despliegue

Antes de publicar la aplicación, configura la URL del backend para el entorno objetivo y asegúrate de que el backend permita las peticiones desde el dominio del frontend mediante CORS o un proxy inverso.
