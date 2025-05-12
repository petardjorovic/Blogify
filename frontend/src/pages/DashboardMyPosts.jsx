import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { getDashboardUserPosts } from '../services/dashboardService';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

function DashboardMyPosts() {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [postsCount, setPostsCount] = useState(0);

    const fetchPosts = useCallback(async () => {
        dispatch(showLoader(true));
        const res = await getDashboardUserPosts(page, limit);
        dispatch(showLoader(false));

        if (res.status === 'success') {
            setPosts(res.posts);
            setPostsCount(res.postsCount);
        }
    }, [dispatch, page, limit]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <div className="mb-3 bg-white rounded-xl shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Your posts</h2>
            {posts.length > 0 && <Pagination itemsCount={postsCount} itemsLimit={limit} currentPage={page} setCurrentPage={setPage} />}
            {posts.length > 0 ? (
                <div className="flex flex-wrap items-center gap-5 my-[15px]">
                    {posts.map((post) => {
                        return <PostCard post={post} rerenderView={fetchPosts} key={post._id} />;
                    })}
                </div>
            ) : (
                <p className="text-lg text-center">You have not created any post yet.</p>
            )}
            {posts.length > 0 && <Pagination itemsCount={postsCount} itemsLimit={limit} currentPage={page} setCurrentPage={setPage} />}
        </div>
    );
}

export default DashboardMyPosts;
