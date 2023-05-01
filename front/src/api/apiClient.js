import { auth } from "@/firebase/config";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = (await auth?.currentUser?.getIdToken()) || window.localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      window.localStorage.removeItem("token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { apiClient };
