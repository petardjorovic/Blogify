import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPostsBySearch } from '../services/postService';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';

function PostBySearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(showLoader(true));
            const res = await getPostsBySearch(searchParams.toString());
            dispatch(showLoader(false));
            if (res.status === 'success') {
                setPosts(res.posts);
            }
        };
        fetchPosts();
    }, [searchParams]);
    return (
        <div className="flex flex-wrap items-center justify-evenly w-full gap-y-5">
            {posts.length > 0 ? (
                posts.map((post) => {
                    return <PostCard key={post._id} post={post} />;
                })
            ) : (
                <div className="text-center w-full pt-[50px]">
                    <p className="text-xl">No results found for your search.</p>
                </div>
            )}
        </div>
    );
}

export default PostBySearchPage;
