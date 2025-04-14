import axios from 'axios';

export const handlePostLike = async (postId) => {
    try {
        const res = await axios.post('/api/post/like', { postId });
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa handlelike');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};
