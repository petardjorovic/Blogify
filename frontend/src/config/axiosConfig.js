import axios from 'axios';
import { localStorageConfig } from './localStorageConfig';

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
