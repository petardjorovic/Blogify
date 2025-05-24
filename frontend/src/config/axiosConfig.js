import axios from 'axios';
import { localStorageConfig } from './localStorageConfig';
import { Navigate } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import { urlConfig } from '../config/urlConfig';

axios.defaults.baseURL = urlConfig.backend;

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
            window.location.href = routesConfig.LOGIN.path;
        }
        return Promise.reject(error); // važno!
    }
);
