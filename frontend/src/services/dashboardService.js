import axios from 'axios';

export const getDashboardHomePosts = async () => {
    try {
        const res = await axios.get('/api/dashboard/home');
        console.log(res, 'res iz servisa get dashboard home posts');
        return res;
    } catch (err) {
        console.error(err, 'err iz servisa get dashboard home posts');
        return err;
    }
};

export const getDashboardUserProfile = async () => {
    try {
        const res = await axios.get('/api/dashboard/profile');
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                user: res.data.user,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get dashboar user');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const updateProfileImage = async (data) => {
    try {
        const res = await axios.patch('/api/dashboard/profile/image', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
                image: res.data.image,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa update profile image');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};

export const updateUserInfo = async (data) => {
    try {
        const res = await axios.patch('/api/dashboard/profile/info', data);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
                user: res.data.user,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa update user info');
        return {
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};
