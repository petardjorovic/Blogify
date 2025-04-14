import axios from 'axios';
import { localStorageConfig } from './localStorageConfig';
import { Navigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:4000';

axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem(localStorageConfig.TOKEN);
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    function (error) {
        // Do something with error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem(localStorageConfig.TOKEN);
            window.location.href = '/';
        }
        return Promise.reject(error); // važno!
    }
);
