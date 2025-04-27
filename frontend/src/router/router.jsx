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
import MemberLayout from '../pages/MemberLayout';
import MembersPage from '../pages/MembersPage';
import ClientLayout from '../pages/ClientLayout';
import DashboardPage from '../pages/DashboardPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: (
                    <RouteProtect>
                        <ClientLayout />
                    </RouteProtect>
                ),
                children: [
                    {
                        path: routesConfig.POST.path,
                        element: <PostsLayout />,
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
                        path: routesConfig.MEMBER.path,
                        element: <MemberLayout />,
                        children: [
                            {
                                path: routesConfig.MEMBER.path,
                                element: <MembersPage />,
                            },
                        ],
                    },
                    {
                        path: routesConfig.SINGLE_POST.path,
                        element: <SinglePostPage />,
                    },
                ],
            },
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
                element: (
                    <RouteProtect>
                        <DashboardPage />
                    </RouteProtect>
                ),
            },
        ],
    },
]);

export default router;
