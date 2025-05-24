import axios from 'axios';

export const getAllTags = async () => {
    try {
        const res = await axios.get('/api/post/tag');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                tags: res.data.tags,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa getTags');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Request failed. Please try again.',
        };
    }
};
