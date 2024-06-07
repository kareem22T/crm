// axiosInstance.ts
import axios from 'axios';
import store from './../store';
import { setCredentials, clearCredentials } from './../features/auth/authSlice';
import { API_URL } from '../_env';

const api = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  withCredentials: true, // Include cookies with requests if needed
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        const { data } = await axios.post(`${API_URL}/refresh`, { refreshToken });
        store.dispatch(setCredentials(data));
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return axios(originalRequest);
      } catch (err) {
        store.dispatch(clearCredentials());
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
