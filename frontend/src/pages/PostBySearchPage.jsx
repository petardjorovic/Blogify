import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPostsBySearch } from '../services/postService';
import PostCard from '../components/PostCard';

function PostBySearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getPostsBySearch(searchParams.toString());
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
