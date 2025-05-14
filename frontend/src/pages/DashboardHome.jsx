import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { getDashboardHomePosts } from '../services/dashboardService';
import PostCard from '../components/PostCard';
import PostsRow from '../components/PostsRow';

function DashboardHome() {
    const [newPosts, setNewPosts] = useState([]);
    const [mostLikedPosts, setMostLikedPosts] = useState([]);
    const [mostCommentedPosts, setMostCommentedPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(showLoader(true));
            const res = await getDashboardHomePosts();
            dispatch(showLoader(false));
            if (res.status === 'success') {
                setNewPosts(res.newPosts);
                setMostLikedPosts(res.mostLikedPosts);
                setMostCommentedPosts(res.mostCommentedPosts);
            }
        };
        fetchPosts();
    }, [dispatch]);

    return (
        <div className="mb-5">
            <div className="space-y-8 px-4">
                {/* Red 1: Najnoviji */}
                <PostsRow title={'🆕 Latest Posts'} posts={newPosts} />

                {/* Red 2: Najviše lajkova */}
                <PostsRow title={'🔥Top Liked Posts'} posts={mostLikedPosts} />

                {/* Red 3: Najviše komentara */}
                <PostsRow title={'💬Most Commented Posts'} posts={mostCommentedPosts} />
            </div>
        </div>
    );
}

export default DashboardHome;
