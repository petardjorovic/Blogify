import axios from 'axios';

export const handlePostLike = async (postId, userLike) => {
    try {
        const res = await axios.put(`/api/post/like/${postId}/${userLike}`);
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
