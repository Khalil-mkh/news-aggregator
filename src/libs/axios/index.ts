import axios, { InternalAxiosRequestConfig } from "axios";

const httpRequest = () => {
  const apiRequest = axios.create({
    timeout: 60000,
  });

  apiRequest.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers.set("Accept", "application/json");
      config.headers.set("Content-Type", "application/json");

      return config;
    },
    (err) => Promise.reject(err)
  );

  return apiRequest;
};

export { httpRequest };
