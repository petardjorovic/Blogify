import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../services/postService';

function PostsPage() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await getAllPosts();
        if (res.status === 'success') {
            setPosts(res.posts);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl">Posts Page</h1>
            {posts.length > 0 &&
                posts.map((post, index) => {
                    return <div key={index}>{post.title}</div>;
                })}
        </div>
    );
}

export default PostsPage;
