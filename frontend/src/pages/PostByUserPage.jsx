import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByUser } from '../services/postService';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';

function PostByUserPage() {
    const [posts, setPosts] = useState([]);
    const { userId } = useParams();
    const dispacth = useDispatch();

    const fetchPosts = async () => {
        dispacth(showLoader(true));
        const res = await getPostsByUser(userId);
        dispacth(showLoader(false));
        if (res.status === 'success') {
            setPosts(res.posts);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className="flex flex-wrap items-center justify-evenly w-full gap-y-5">
            {posts.length > 0 &&
                posts.map((post) => {
                    return <PostCard key={post._id} post={post} rerenderView={fetchPosts} />;
                })}
        </div>
    );
}

export default PostByUserPage;
