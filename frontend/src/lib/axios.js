import axios from "axios";
import { api as backendUrl } from "../constants/api";

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      console.log("Failed to set auth token for request.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api };
