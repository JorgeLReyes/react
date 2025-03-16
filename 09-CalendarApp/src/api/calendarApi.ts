import axios from "axios";
import { envs } from "../helpers";

const url = envs().VITE_API_URL;

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   config.headers.set("Authorization", "Authorization");
//   return config;
// });

export { api };
