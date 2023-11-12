import axios from "axios";
export const BASE_URL = import.meta.env.VITE_API_BASE;
export const unAuthinticatedApiClient = axios.create({
  baseURL: BASE_URL,
});
