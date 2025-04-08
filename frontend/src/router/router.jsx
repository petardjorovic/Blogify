import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import PostsPage from '../pages/PostsPage';
import RegisterPage from '../pages/RegisterPage';
import RouteProtect from '../components/RouteProtect';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <LoginPage />,
            },
            {
                path: '/register',
                element: <RegisterPage />,
            },
            {
                path: '/posts',
                element: (
                    <RouteProtect>
                        <PostsPage />
                    </RouteProtect>
                ),
            },
            {
                path: '/dashboard',
                element: <h1>Dashboard</h1>,
            },
        ],
    },
]);

export default router;
