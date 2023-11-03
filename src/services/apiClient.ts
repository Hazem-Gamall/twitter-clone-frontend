import axios from "axios";

export const unAuthinticatedApiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});
