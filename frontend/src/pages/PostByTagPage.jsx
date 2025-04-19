import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByTag } from '../services/postService';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';

function PostByTagPage() {
    const { tagName } = useParams();
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const [itemsLimit, setItemsLimit] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPosts = async () => {
        dispatch(showLoader(true));
        const res = await getPostsByTag(tagName);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            setPosts(res.posts);
        }
    };
    useEffect(() => {
        setPosts([]);
        fetchPosts();
    }, [tagName]);

    return (
        <div className="flex flex-wrap items-center justify-between w-full gap-y-5">
            {posts.length > 0 &&
                posts.map((post) => {
                    return <PostCard key={post._id} post={post} rerenderView={fetchPosts} />;
                })}
        </div>
    );
}

export default PostByTagPage;
