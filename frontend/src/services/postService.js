import axios from 'axios';

export const getAllPosts = async (page, limit) => {
    try {
        const res = await axios.get(`/api/post?page=${page}&limit=${limit}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                posts: res.data.posts,
                postsCount: res.data.postsCount,
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

export const getPostsByTag = async (tagName, page, limit) => {
    try {
        const res = await axios.get(`/api/post/tag/${tagName}?page=${page}&limit=${limit}`);

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                posts: res.data.posts,
                postsCount: res.data.postsCount,
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

export const getPostsByUser = async (userId, page, limit) => {
    try {
        const res = await axios.get(`/api/post/user/${userId}?page=${page}&limit=${limit}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                posts: res.data.posts,
                postsCount: res.data.postsCount,
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

export const getPostsBySearch = async (data, page, limit) => {
    try {
        const res = await axios.get(`/api/post/search/${page}/${limit}?${data}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                posts: res.data.posts,
                postsCount: res.data.postsCount,
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

export const addNewPost = async (data) => {
    try {
        const res = await axios.post('/api/post', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa add new post');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const deleteSinglePost = async (postId, userId) => {
    try {
        const res = await axios.delete(`/api/post/${postId}/${userId}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa delete single post');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};
