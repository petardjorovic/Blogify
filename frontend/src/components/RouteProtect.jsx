import { Navigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { localStorageConfig } from '../config/localStorageConfig';

function RouteProtect({ children }) {
    const token = localStorage.getItem(localStorageConfig.TOKEN);
    return token ? children : <Navigate to={routesConfig.LOGIN.path} replace />;
}

export default RouteProtect;
