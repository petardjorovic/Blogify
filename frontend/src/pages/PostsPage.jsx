import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../services/postService';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';

function PostsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [postsCount, setPostsCount] = useState(0);
    const { refreshPosts } = useOutletContext();
    const dispatch = useDispatch();
    const [itemsLimit, setItemsLimit] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPosts = async () => {
        dispatch(showLoader(true));
        const res = await getAllPosts(searchParams.get('page') || 1, searchParams.get('limit') || 12);
        dispatch(showLoader(false));

        if (res.status === 'success') {
            setPosts(res.posts);
            setPostsCount(res.postsCount);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [refreshPosts, searchParams]);
    return (
        <>
            {posts.length > 0 && (
                <Pagination itemsCount={postsCount} itemsLimit={itemsLimit} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
            <div className="flex flex-wrap items-center justify-between w-full gap-y-5 my-[15px]">
                {posts.length > 0 &&
                    posts.map((post) => {
                        return <PostCard key={post._id} post={post} rerenderView={fetchPosts} />;
                    })}
            </div>
            {posts.length > 0 && (
                <Pagination itemsCount={postsCount} itemsLimit={itemsLimit} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
        </>
    );
}

export default PostsPage;
