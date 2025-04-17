import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSinglePost } from '../services/postService';
import { formatDate } from '../utils/formatDate';
import AddCommentForm from '../components/AddCommentForm';
import { routesConfig } from '../config/routesConfig';
import Comment from '../components/Comment';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import CommentsList from '../components/CommentsList';
// import { useQuery } from '@tanstack/react-query';

function SinglePostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const dispatch = useDispatch();

    //* Ovo je fetchovanje pomocu tanstack/react-query
    // const { data, isSuccess } = useQuery({
    //     queryKey: ['singlePost'],
    //     queryFn: () => getSinglePost(postId),
    // });

    // let { post } = isSuccess && data;

    const fetchPost = async () => {
        dispatch(showLoader(true));
        const res = await getSinglePost(postId);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            setPost(res.post);
        }
    };
    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="px-[16px]">
                {/* {isSuccess ? ( */}
                {Object.hasOwn(post, '_id') ? (
                    <div className="box flex flex-col md:flex-row items-stretch">
                        {/* LEFT */}
                        <div className="w-full md:w-1/2 p-[10px]">
                            <h2 className="font-semibold text-3xl mb-[10px]">{post.title}</h2>
                            <div className="mb-[10px]">
                                {post.tags.length > 0 ? (
                                    post.tags.map((tag, index) => {
                                        return (
                                            <Link to={routesConfig.POST_TAG.realPath(tag.name)} key={index}>
                                                #{tag.name}
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <span>There are no tags</span>
                                )}
                            </div>
                            <p className="mb-[10px]">{post.body}</p>
                            <Link to={routesConfig.POST_AUTHOR.realPath(post.userId)} className="font-medium text-lg mb-[10px]">
                                {post.user?.firstName + ' ' + post.user?.lastName}
                            </Link>
                            <p className="text-gray-700 mb-[18px]">Published: {formatDate(post.createdAt)}</p>
                            <AddCommentForm postId={post._id} rerenderView={fetchPost} />
                            {/* Comments list */}
                            {post.comments.length > 0 && <CommentsList post={post} rerenderView={fetchPost} />}
                        </div>
                        {/* RIGHT */}
                        <div className="w-full md:w-1/2 p-[10px]">
                            <img
                                src={post.image.includes('uploads') ? 'http://localhost:4000/' + post.image : post.image}
                                alt=""
                                className="w-full h-full lg:h-[460px] object-cover rounded-lg"
                            />
                        </div>
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
}

export default SinglePostPage;
