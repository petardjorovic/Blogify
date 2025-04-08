import { Navigate } from 'react-router-dom';
import { localStorageConfig } from '../config/localStorageConfig';
import { routesConfig } from '../config/routesConfig';

function RouteProtect({ children }) {
    const isLoged = localStorage.getItem(localStorageConfig.TOKEN);
    return isLoged ? children : <Navigate to={routesConfig.LOGIN.path} />;
}

export default RouteProtect;
