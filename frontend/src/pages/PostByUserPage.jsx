import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByUser } from '../services/postService';
import PostCard from '../components/PostCard';

function PostByUserPage() {
    const [posts, setPosts] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getPostsByUser(userId);
            if (res.status === 'success') {
                setPosts(res.posts);
                console.log(res);
            }
        };
        fetchPosts();
    }, [userId]);
    return (
        <div className="flex flex-wrap items-center justify-evenly w-full gap-y-5">
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

export default PostByUserPage;
