import axios, { InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

// Function to create axios instance with dynamic baseURL
export const createAxiosInstance = (baseURL: string) => {
  const authAxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  authAxiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  authAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
        localStorage.removeItem("access_token");
        toast("Your session has expired. Please sign in again to continue.", {
          icon: "⚠️",
        });
        window.location.href = "/sign-in";
      }
      return Promise.reject(error);
    }
  );

  return authAxiosInstance;
};

// Example of setting headers dynamically
export const setHeaders = (
  axiosInstance: any,
  headers: Record<string, string>
) => {
  Object.assign(axiosInstance.defaults.headers.common, headers);
};

export const resetHeaders = (axiosInstance: any) => {
  axiosInstance.defaults.headers.common = {
    "Content-Type": "application/json",
  };
};
