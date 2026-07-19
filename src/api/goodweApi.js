import axios from "axios";

const api = axios.create({
  baseURL: "/api/goodwe",
});

export const getDashboard = () => api.get("/dashboard");

export const getStatistics = () => api.get("/statistics");

export const getPowerChart = (date) =>
  api.get("/charts/power", {
    params: { date },
  });

export const getGenerationChart = (range, date) =>
  api.get("/charts/generation", {
    params: { range, date },
  });

export default api;
