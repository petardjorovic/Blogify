import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import PostsPage from '../pages/PostsPage';

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
                element: <PostsPage />,
            },
            {
                path: '/dashboard',
                element: <h1>Dashboard</h1>,
            },
        ],
    },
]);

export default router;
