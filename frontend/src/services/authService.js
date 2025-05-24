import axios from 'axios';

export const login = async (data) => {
    try {
        const res = await axios.post('/api/auth/login', data);

        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
                user: res.data.user,
                token: res.data.token,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa login');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Login failed. Please try again.',
        };
    }
};

export const register = async (data) => {
    try {
        const res = await axios.post('/api/auth/register', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa register');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Register failed. Please try again.',
        };
    }
};

export const fetchUserFromToken = async () => {
    try {
        const res = await axios.get('/api/auth/me');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                user: res.data.user,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa fetchUserFromToken');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Request failed. Please try again.',
        };
    }
};

export const checkUserActivation = async (token) => {
    try {
        const res = await axios.post(`/api/auth/activation/${token}`);
        if (res.status === 200) {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa check user activation');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Request failed. Please try again.',
        };
    }
};

export const changePassword = async (data) => {
    try {
        const res = await axios.patch('/api/auth/changePassword', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa change password');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Request for change password failed. Please try again.',
        };
    }
};

export const forgotPassword = async (data) => {
    try {
        const res = await axios.post('/api/auth/forgotPassword', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa forgot password');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Request for forgot password failed. Please try again.',
        };
    }
};

export const resetPassword = async (data, token) => {
    try {
        const res = await axios.patch(`/api/auth/resetPassword/${token}`, data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa reset password');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Request for reset password failed. Please try again.',
        };
    }
};

export const resendActivationLink = async (email) => {
    try {
        const res = await axios.post('/api/auth/resendActivation', email);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa resend activation link');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Request for resend activation link failed. Please try again.',
        };
    }
};
