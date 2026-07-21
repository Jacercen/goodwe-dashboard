import axios from "axios";

const api = axios.create({
  baseURL: "/api/goodwe",
});

/* =========================
   AUTH
========================= */

export const login = (account, password) =>
  api.post("/login", {
    account,
    password,
  });

export const getAuthStatus = () => api.get("/auth/status");

export const logout = () => api.post("/logout");

/* =========================
   PLANTS
========================= */

export const getPlants = () => api.get("/plants");

/* =========================
   DASHBOARD
========================= */

export const getDashboard = (plantId) =>
  api.get(`/plants/${plantId}/dashboard`);

/* =========================
   STATISTICS
========================= */

export const getStatistics = (plantId) =>
  api.get(`/plants/${plantId}/statistics`);

/* =========================
   POWER CHART
========================= */

export const getPowerChart = (plantId, date) =>
  api.get(`/plants/${plantId}/charts/power`, {
    params: { date },
  });

/* =========================
   GENERATION CHART
========================= */

export const getGenerationChart = (plantId, range, date) =>
  api.get(`/plants/${plantId}/charts/generation`, {
    params: {
      range,
      date,
    },
  });

export default api;
