import axios from 'axios';

export const getDashboardHomePosts = async () => {
    try {
        const res = await axios.get('/api/dashboard/home/posts');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                newPosts: res.data.newPosts,
                mostLikedPosts: res.data.mostLikedPosts,
                mostCommentedPosts: res.data.mostCommentedPosts,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get dashboard home posts');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const getDashboardUserProfile = async () => {
    try {
        const res = await axios.get('/api/dashboard/profile');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                user: res.data.user,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get dashboar user');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const updateProfileImage = async (data) => {
    try {
        const res = await axios.patch('/api/dashboard/profile/image', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
                image: res.data.image,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa update profile image');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const updateUserInfo = async (data) => {
    try {
        const res = await axios.patch('/api/dashboard/profile/info', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
                user: res.data.user,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa update user info');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const getDashboardUserPosts = async () => {
    try {
        const res = await axios.get('/api/dashboard/user/posts');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                posts: res.data.posts,
                postsCount: res.data.postsCount,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get dashboard user posts');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const getDashboardUserReactionsLikes = async (page, limit) => {
    try {
        const res = await axios.get(`/api/dashboard/reactions/likes?page=${page}&limit=${limit}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                likes: res.data.likes,
                total: res.data.total,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get dashboard user reactions likes');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const getDashboardUserReactionsComments = async (page, limit) => {
    try {
        const res = await axios.get(`/api/dashboard/reactions/comments?page=${page}&limit=${limit}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                comments: res.data.comments,
                total: res.data.total,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get dashboard user reactions comments');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};
