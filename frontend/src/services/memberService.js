import axios from 'axios';

export const getAllUsers = async (page, limit) => {
    try {
        const res = await axios.get(`/api/member?page=${page}&limit=${limit}`);
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
            status: err.response.data.error.status,
            message: err.response.data.message,
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
            status: err.response.data.error.status,
            message: err.response.data.message,
        };
    }
};
