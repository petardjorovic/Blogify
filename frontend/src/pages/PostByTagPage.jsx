import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPostsByTag } from '../services/postService';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import Pagination from '../components/Pagination';

function PostByTagPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { tagName } = useParams();
    const [posts, setPosts] = useState([]);
    const [postsCount, setPostsCount] = useState(0);
    const dispatch = useDispatch();
    const [itemsLimit, setItemsLimit] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPosts = async () => {
        const page = searchParams.get('page') || 1;
        const limit = searchParams.get('limit') || 12;
        dispatch(showLoader(true));
        const res = await getPostsByTag(tagName, page, limit);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            setPosts(res.posts);
            setPostsCount(res.postsCount);
        }
    };
    useEffect(() => {
        setPosts([]);
        fetchPosts();
    }, [tagName, searchParams]);

    return (
        <>
            {posts.length > 0 && (
                <Pagination itemsCount={postsCount} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsLimit={itemsLimit} />
            )}
            <div className="flex flex-wrap items-center gap-[34px] w-full gap-y-5 my-[15px]">
                {posts.length > 0 &&
                    posts.map((post) => {
                        return <PostCard key={post._id} post={post} rerenderView={fetchPosts} />;
                    })}
            </div>
            {posts.length > 0 && (
                <Pagination itemsCount={postsCount} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsLimit={itemsLimit} />
            )}
        </>
    );
}

export default PostByTagPage;
