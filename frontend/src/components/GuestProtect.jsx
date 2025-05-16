import React from 'react';
import { localStorageConfig } from '../config/localStorageConfig';
import { Navigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';

function GuestProtect({ children }) {
    const token = localStorage.getItem(localStorageConfig.TOKEN);
    return token ? <Navigate to={routesConfig.DASHBOARD_ROOT.path} replace /> : children;
}

export default GuestProtect;
