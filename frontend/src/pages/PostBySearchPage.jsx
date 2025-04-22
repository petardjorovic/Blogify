import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPostsBySearch } from '../services/postService';
import PostCard from '../components/PostCard';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import SearchPagination from '../components/SearchPagination';

function PostBySearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsLimit, setItemsLimit] = useState(12);
    const [itemsCount, setItemsCount] = useState(0);

    const fetchPosts = async () => {
        console.log(searchParams.toString());

        dispatch(showLoader(true));
        const res = await getPostsBySearch(searchParams.toString());
        dispatch(showLoader(false));
        if (res.status === 'success') {
            setPosts(res.posts);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, [searchParams]);
    return (
        <>
            {posts.length > 0 && (
                <SearchPagination
                    itemsCount={itemsCount}
                    itemsLimit={itemsLimit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
            <div className="flex flex-wrap items-center gap-[34px] w-full gap-y-5 py-[15px]">
                {posts.length > 0 ? (
                    posts.map((post) => {
                        return <PostCard key={post._id} post={post} rerenderView={fetchPosts} />;
                    })
                ) : (
                    <div className="text-center w-full pt-[50px]">
                        <p className="text-xl">No results found for your search.</p>
                    </div>
                )}
            </div>
            {posts.length > 0 && (
                <SearchPagination
                    itemsCount={itemsCount}
                    itemsLimit={itemsLimit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </>
    );
}

export default PostBySearchPage;
