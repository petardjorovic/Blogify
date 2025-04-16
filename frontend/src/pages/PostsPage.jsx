import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../services/postService';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { useOutletContext } from 'react-router-dom';

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const { refreshPosts } = useOutletContext();
    const dispatch = useDispatch();

    const fetchPosts = async () => {
        dispatch(showLoader(true));
        const res = await getAllPosts();
        dispatch(showLoader(false));

        if (res.status === 'success') {
            setPosts(res.posts);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [refreshPosts]);
    return (
        <div className="flex flex-wrap items-center justify-between w-full gap-y-5">
            {posts.length > 0 &&
                posts.map((post) => {
                    return <PostCard key={post._id} post={post} rerenderView={fetchPosts} />;
                })}
        </div>
    );
}

export default PostsPage;
