import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import PostsPage from '../pages/PostsPage';
import RegisterPage from '../pages/RegisterPage';
import RouteProtect from '../components/RouteProtect';
import { routesConfig } from '../config/routesConfig';
import PostsLayout from '../pages/PostsLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: routesConfig.LOGIN.path,
                element: <LoginPage />,
            },
            {
                path: routesConfig.REGISTER.path,
                element: <RegisterPage />,
            },
            {
                path: routesConfig.DASHBOARD.path,
                element: <h1>Dashboard</h1>,
            },
            {
                path: routesConfig.POSTS.path,
                element: (
                    <RouteProtect>
                        <PostsLayout />
                    </RouteProtect>
                ),
                children: [
                    {
                        path: '',
                        element: <PostsPage />,
                    },
                ],
            },
        ],
    },
]);

export default router;
