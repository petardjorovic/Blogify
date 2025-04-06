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
