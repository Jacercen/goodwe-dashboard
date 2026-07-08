# GoodWe Dashboard Frontend

A React application that provides a modern and user-friendly dashboard for monitoring a GoodWe photovoltaic installation.

This frontend consumes the custom Spring Boot REST API developed for the project instead of communicating directly with GoodWe.

## Features

- Home dashboard with the most relevant information
- Technical data page
- Automatic refresh of plant data
- Responsive layout
- Reusable React components
- REST API integration with Axios

## Current Information Displayed

- Solar production
- Home consumption
- Battery state of charge
- Battery status
- Grid power
- Daily generation
- Total generation
- Last update time

## Tech Stack

- React
- React Router
- Axios
- React Icons
- CSS3

## Project Structure

```
src
│
├── api
├── components
├── pages
├── styles
│   ├── base
│   ├── components
│   └── pages
└── main.jsx
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## Backend

This project requires the GoodWe API backend running locally.

Default backend URL:

```
http://localhost:8080/api/goodwe
```

## Future Improvements

- Statistics page
- Interactive charts
- Weather integration
- Energy savings calculations
- Responsive improvements
- Dark/Light theme
- Raspberry Pi deployment

## Preview

![Home Dashboard](docs/dashboard.png)

## Status

🚧 Work in progress.
