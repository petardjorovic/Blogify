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
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Add comment failed. Please try again.',
        };
    }
};

export const deleteComment = async (commentId) => {
    try {
        const res = await axios.delete(`/api/post/comment/${commentId}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa deleteComment');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Delete comment failed. Please try again.',
        };
    }
};
