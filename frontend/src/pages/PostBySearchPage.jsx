import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getPostsBySearch } from '../services/postService';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import Pagination from '../components/Pagination';
import { useCallback } from 'react';

function PostBySearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [itemsLimit, setItemsLimit] = useState(12);
    const [itemsCount, setItemsCount] = useState(0);
    const location = useLocation();

    const fetchPosts = useCallback(async () => {
        // if (!location.pathname.includes('post/search')) return;
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 12;
        dispatch(showLoader(true));
        const res = await getPostsBySearch(searchParams.toString(), page, limit);
        dispatch(showLoader(false));
        console.log(res);

        if (res.status === 'success') {
            setPosts(res.posts);
            setItemsCount(res.postsCount);
        }
    }, [searchParams, dispatch]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <>
            {posts.length > 0 && (
                <Pagination itemsCount={itemsCount} itemsLimit={itemsLimit} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
            <div className="flex flex-wrap items-center gap-[34px] w-full gap-y-5 py-[15px]">
                {posts.length > 0 &&
                    posts.map((post) => {
                        return <PostCard key={post._id} post={post} rerenderView={fetchPosts} />;
                    })}
            </div>
            {posts.length > 0 && (
                <Pagination itemsCount={itemsCount} itemsLimit={itemsLimit} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
        </>
    );
}

export default PostBySearchPage;
