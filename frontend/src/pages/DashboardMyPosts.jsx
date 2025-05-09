import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { getDashboardUserPosts } from '../services/dashboardService';
import PostCard from '../components/PostCard';

function DashboardMyPosts() {
    const { user } = useSelector((state) => state.userStore);
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    const fetchPosts = async () => {
        dispatch(showLoader(true));
        const res = await getDashboardUserPosts();
        dispatch(showLoader(false));
        if (res.status === 'success') {
            setPosts(res.posts);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="box">
            <h2 className="text-xl font-bold mb-4">{user?.firstName}'s posts</h2>
            {posts.length > 0 ? (
                <div className="flex flex-wrap items-center gap-7">
                    {posts.map((post) => {
                        return <PostCard post={post} rerenderView={fetchPosts} key={post._id} />;
                    })}
                </div>
            ) : (
                <p className="text-lg text-center">You have not created any post yet.</p>
            )}
        </div>
    );
}

export default DashboardMyPosts;
