import axios from "axios";
import { config } from "./config";
import { cookieManager } from "./cookie-manager";

const BASE_URL = config.env.SERVER_URL;
const PUBLIC_ROUTES = ["/login", "/register", "/"];

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookieManager.getAuthToken()}`,
  },
});

let refreshPromise: Promise<boolean> | null = null;

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookieManager.getAuthToken()}`,
        },
      }
    );

    if (response.data.success && response.data.token) {
      cookieManager.setRefreshedAccessToken(response.data.token);
      return true;
    }
    return false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // ** Skip token checking for public routes **
    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      config.url?.includes(route)
    );
    // If it's a public route, don't attach the token
    if (!isPublicRoute) {
      const token = cookieManager.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorStatus = error.response?.status;
    const location = window.location.pathname;

    // Only try to refresh token on 401 errors and if we haven't retried yet
    if (
      errorStatus === 401 &&
      !originalRequest._retry &&
      !location.includes("/login")
    ) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it
        if (!refreshPromise) {
          refreshPromise = refreshToken();
        }
        const success = await refreshPromise;
        refreshPromise = null;

        if (success) {
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${cookieManager.getAuthToken()}`;
          return api(originalRequest);
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
      }

      // If we reach here, refresh failed or token is invalid
      cookieManager.removeAuthToken();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
