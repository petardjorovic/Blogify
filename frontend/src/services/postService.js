import axios from 'axios';

export const getAllPosts = async () => {
    try {
        const res = await axios.get('/api/post/');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                posts: res.data.posts,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa getall posts');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const getSinglePost = async (postId) => {
    try {
        const res = await axios.get(`/api/post/${postId}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                post: res.data.post,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa getsinglepost');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const getPostsByTag = async (tagName) => {
    try {
        const res = await axios.get(`/api/post/tag/${tagName}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                posts: res.data.posts,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get post by tag');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const getPostsByUser = async (userId) => {
    try {
        const res = await axios.get(`/api/post/user/${userId}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                posts: res.data.posts,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get posts by user');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const getPostsBySearch = async (data) => {
    try {
        const res = await axios.get(`/api/post/search?${data}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                posts: res.data.posts,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa getpostbysearch');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};
