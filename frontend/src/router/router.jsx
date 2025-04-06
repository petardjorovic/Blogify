import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import PostsPage from '../pages/PostsPage';
import { localStorageConfig } from '../config/localStorageConfig';

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

function RouteProtect({ children }) {
    const isLoged = localStorage.getItem(localStorageConfig.TOKEN);
    return isLoged ? children : <Navigate to={'/'} />;
}

export default router;
