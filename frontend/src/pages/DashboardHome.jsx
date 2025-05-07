import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { getDashboardHomePosts } from '../services/dashboardService';

function DashboardHome() {
    const [newPosts, setNewPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [commentedPosts, setCommentedPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(showLoader(true));
            const res = await getDashboardHomePosts();
            dispatch(showLoader(false));
            console.log(res, 'res sa fronta get dashboard home posts');
        };

        fetchPosts();
    }, [dispatch]);

    return <div>DashboardHome</div>;
}

export default DashboardHome;
