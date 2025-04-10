import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByTag } from '../services/postService';
import PostCard from '../components/PostCard';

function PostByTagPage() {
    const { tagName } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts([]);
        const fetchPost = async () => {
            const res = await getPostsByTag(tagName);
            if (res.status === 'success') {
                setPosts(res.posts);
            }
        };
        fetchPost();
    }, [tagName]);

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

export default PostByTagPage;
