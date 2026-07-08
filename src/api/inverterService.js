import api from "./api";

export const getInverter = () => api.get("/inverter/details");
