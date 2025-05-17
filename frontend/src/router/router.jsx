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
import ActivationUserPage from '../pages/ActivationUserPage';
import DashboardLayout from '../pages/DashboardLayout';
import DashboardProfilePage from '../pages/DashboardProfilePage';
import DashboardHome from '../pages/DashboardHome';
import DashboardMyPosts from '../pages/DashboardMyPosts';
import DashboardMyReactions from '../pages/DashboardMyReactions';
import DashboardPostsEdit from '../pages/DashboardPostsEdit';
import GuestProtect from '../components/GuestProtect';
import ResetPasswordPage from '../pages/ResetPasswordPage';

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
                    {
                        path: routesConfig.DASHBOARD_ROOT.path,
                        element: (
                            <RouteProtect>
                                <DashboardLayout />
                            </RouteProtect>
                        ),
                        children: [
                            {
                                path: routesConfig.DASHBOARD_ROOT.path,
                                element: <DashboardHome />,
                            },
                            {
                                path: routesConfig.DASHBOARD_PROFILE.path,
                                element: <DashboardProfilePage />,
                            },
                            {
                                path: routesConfig.DASHBOARD_POSTS.path,
                                element: <DashboardMyPosts />,
                            },
                            {
                                path: routesConfig.DASHBOARD_REACTIONS.path,
                                element: <DashboardMyReactions />,
                            },
                            {
                                path: routesConfig.DASHBOARD_POSTS_EDIT.path,
                                element: <DashboardPostsEdit />,
                            },
                        ],
                    },
                ],
            },
            {
                path: routesConfig.LOGIN.path,
                element: (
                    <GuestProtect>
                        <LoginPage />
                    </GuestProtect>
                ),
            },
            {
                path: routesConfig.REGISTER.path,
                element: (
                    <GuestProtect>
                        <RegisterPage />
                    </GuestProtect>
                ),
            },
        ],
    },
    {
        path: routesConfig.ACTIVATION.path,
        element: <ActivationUserPage />,
    },
    {
        path: routesConfig.RESET_PASSWORD.path,
        element: <ResetPasswordPage />,
    },
]);

export default router;
