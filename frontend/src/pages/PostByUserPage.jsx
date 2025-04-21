import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPostsByUser } from '../services/postService';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import Pagination from '../components/Pagination';

function PostByUserPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [postsCount, setPostsCount] = useState(0);
    const { userId } = useParams();
    const dispacth = useDispatch();
    const [itemsLimit, setItemsLimit] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPosts = async () => {
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 12;
        dispacth(showLoader(true));
        const res = await getPostsByUser(userId, page, limit);
        dispacth(showLoader(false));
        if (res.status === 'success') {
            setPosts(res.posts);
            setPostsCount(res.postsCount);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);
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

export default PostByUserPage;
