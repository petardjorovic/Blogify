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
            status: err.response.data.error.status,
            message: err.response.data.message,
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
            status: err.response.data.error.status,
            message: err.response.data.message,
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
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const checkUserActivation = async (token) => {
    try {
        const res = await axios.post(`/api/auth/activation/${token}`);
        console.log(res, 'res iz servisa checkuserActivation');
        if (res.status === 200) {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa check user activation');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
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
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const forgotPassword = async (data) => {
    try {
        const res = await axios.post('/api/auth/forgotPassword', data);
        console.log(res, 'res iz servisa forgot password');
        return res;
    } catch (err) {
        console.error(err, 'err iz servisa forgot password');
        return err;
    }
};

export const resetPassword = async (token) => {
    try {
        const res = await axios.patch(`/api/auth/resetPassword/${token}`);
        console.log(res, 'res iz servisa reset password');
        return res;
    } catch (err) {
        console.error(err, 'err iz servisa reset password');
        return err;
    }
};
