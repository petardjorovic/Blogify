import axios from 'axios';

export const getAllUsers = async (page, limit, member) => {
    try {
        const res = await axios.get(`/api/member?page=${page}&limit=${limit}&member=${member}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                members: res.data.members,
                membersCount: res.data.membersCount,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get all users');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Request failed. Please try again.',
        };
    }
};

export const getMemberInfo = async (userId) => {
    try {
        const res = await axios.get(`/api/member/${userId}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                member: res.data.member,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa get member info');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Request failed. Please try again.',
        };
    }
};

export const deleteMember = async (memberId) => {
    try {
        const res = await axios.delete(`/api/member/${memberId}`);
        if (res.status === 200 && res.data.status === 'success') {
            return {
                status: res.data.status,
                message: res.data.message,
            };
        }
    } catch (err) {
        console.error(err, 'err iz servisa delete member');
        return {
            status: err.response?.data?.error?.status || 'error',
            message: err.response?.data?.message || err.message || 'Delete request failed. Please try again.',
        };
    }
};
