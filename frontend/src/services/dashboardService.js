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
