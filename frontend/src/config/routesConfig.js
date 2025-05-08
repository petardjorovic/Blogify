export const routesConfig = {
    LOGIN: {
        path: '/login',
    },
    REGISTER: {
        path: '/register',
    },
    POST: {
        path: '/post',
    },
    POST_AUTHOR: {
        path: '/post/author/:userId',
        realPath: (userId) => `/post/author/${userId}`,
    },
    POST_TAG: {
        path: '/post/tag/:tagName',
        realPath: (tagName) => `/post/tag/${tagName}`,
    },
    SINGLE_POST: {
        path: '/post/:postId',
        realPath: (postId) => `/post/${postId}`,
    },
    SEARCH_POST: {
        path: '/post/search',
    },
    MEMBER: {
        path: '/member',
    },
    DASHBOARD_ROOT: {
        path: '/dashboard',
    },
    DASHBOARD_PROFILE: {
        path: '/dashboard/profile/:userId',
        realPath: (userId) => `/dashboard/profile/${userId}`,
    },
    DASHBOARD_POSTS: {
        path: '/dashboard/posts/:userId',
        realPath: (userId) => `/dashboard/posts/${userId}`,
    },
    DASHBOARD_REACTIONS: {
        path: '/dashboard/reactions/:userId',
        realPath: (userId) => `/dashboard/reactions/${userId}`,
    },
    ACTIVATION: {
        path: '/activation/:activationToken',
    },
};
