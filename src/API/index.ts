import axios from 'axios';
import { setCredentials, clearCredentials } from './../features/auth/authSlice';
import { API_URL } from '../_env';
import { Store } from '@reduxjs/toolkit';

const api = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  withCredentials: false, // Include cookies with requests if needed
});

const setupInterceptors = (store: Store) => {
api.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Access the current state directly from the store
    const token = state.auth.token; // Get the token from the state

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
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const state = store.getState(); // Access the current state directly from the store
        const refreshToken = state.auth.refreshToken; // Get the refresh token from the state

        const { data } = await axios.get(`${API_URL}/api/Auth/refreshToken`, { 
          headers: {
            refreshToken: refreshToken
          }
         });
        store.dispatch(setCredentials(data)); // Dispatch the action to set new credentials

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return axios(originalRequest);
      } catch (err) {
        store.dispatch(clearCredentials()); // Dispatch the action to clear credentials
        window.location.href = '/login'; // Redirect to login
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
};
export { api, setupInterceptors };