
import { useMemo } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";

const useApi = () => {
  const { token } = useAuthStore();

  const api = useMemo(() => {
    const instance = axios.create({
      // baseURL: "http://localhost:5000/api",
      baseURL: import.meta.env.VITE_API_BASE_URL || "https://expence.degefagomora.com/api",
    });
    instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, [token]); 

  return api;
};

export default useApi;