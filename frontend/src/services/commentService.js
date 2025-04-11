import axios from 'axios';

export const addComment = async (data) => {
    try {
        const res = await axios.post('/api/post/comment', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa add comment');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};
