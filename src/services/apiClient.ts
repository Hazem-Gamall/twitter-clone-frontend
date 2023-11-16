import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_API_BASE;
export const unAuthinticatedApiClient = axios.create({
  baseURL: API_BASE_URL,
});
