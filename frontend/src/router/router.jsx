import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import PostsPage from '../pages/PostsPage';
import RegisterPage from '../pages/RegisterPage';
import RouteProtect from '../components/RouteProtect';
import { routesConfig } from '../config/routesConfig';
import PostsLayout from '../pages/PostsLayout';
import PostByTagPage from '../pages/PostByTagPage';
import PostByUserPage from '../pages/PostByUserPage';
import SinglePostPage from '../pages/SinglePostPage';
import PostBySearchPage from '../pages/PostBySearchPage';

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
                path: routesConfig.POST.path,
                element: (
                    <RouteProtect>
                        <PostsLayout />
                    </RouteProtect>
                ),
                children: [
                    {
                        path: routesConfig.POST.path,
                        element: <PostsPage />,
                    },
                    {
                        path: routesConfig.POST_TAG.path,
                        element: <PostByTagPage />,
                    },
                    {
                        path: routesConfig.POST_AUTHOR.path,
                        element: <PostByUserPage />,
                    },
                    {
                        path: routesConfig.SEARCH_POST.path,
                        element: <PostBySearchPage />,
                    },
                ],
            },
            {
                path: routesConfig.SINGLE_POST.path,
                element: <SinglePostPage />,
            },
            {
                path: routesConfig.DASHBOARD.path,
                element: <h1>Dashboard</h1>,
            },
        ],
    },
]);

export default router;
