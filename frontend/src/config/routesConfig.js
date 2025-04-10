export const routesConfig = {
    LOGIN: {
        path: '/',
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
    DASHBOARD: {
        path: '/dashboard',
    },
};
