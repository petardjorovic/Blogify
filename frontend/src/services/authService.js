import axios from 'axios';

export const login = async (data) => {
    try {
        const res = await axios.post('/api/auth/login', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
                token: res.data.token,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa login');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};
