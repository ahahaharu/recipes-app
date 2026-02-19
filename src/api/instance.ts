import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      'Ошибка запроса:',
      error.response?.data?.message || error.message
    );
    return Promise.reject(error);
  }
);
