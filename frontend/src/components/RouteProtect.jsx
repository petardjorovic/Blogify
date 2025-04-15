import { Navigate } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { useSelector } from 'react-redux';
import Loader from './Loader';

function RouteProtect({ children }) {
    const { user, status } = useSelector((state) => state.userStore);
    return user ? children : <Navigate to={routesConfig.LOGIN.path} replace />;
}

export default RouteProtect;
