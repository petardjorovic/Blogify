import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../services/postService';
import PostCard from '../components/PostCard';

function PostsPage() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await getAllPosts();
        if (res.status === 'success') {
            setPosts(res.posts);
            console.log(res.posts);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className="flex flex-wrap items-center justify-between w-full gap-y-5">
            {posts.length > 0 ? (
                posts.map((post) => {
                    return <PostCard key={post._id} post={post} />;
                })
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PostsPage;
