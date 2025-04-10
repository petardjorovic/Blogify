import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSinglePost } from '../services/postService';
import { toast } from 'react-toastify';
import { formatDate } from '../utils/formatDate';
import Comment from '../components/Comment';

function SinglePostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const res = await getSinglePost(postId);
            if (res.status === 'success') {
                setPost(res.post);
                console.log(res, 'res sa fronta');
            } else {
                toast(res.message, {
                    type: 'error',
                    toastId: 1,
                });
            }
        };
        fetchPost();
    }, [postId]);

    return (
        <div className="container mx-auto">
            <div className="px-[16px]">
                {Object.hasOwn(post, '_id') ? (
                    <div className="box flex flex-col md:flex-row items-stretch">
                        {/* LEFT */}
                        <div className="w-full md:w-1/2 p-[10px]">
                            <h2 className="font-semibold text-3xl mb-[10px]">{post.title}</h2>
                            <div className="mb-[10px]">
                                {post.tags.length > 0 ? (
                                    post.tags.map((tag, index) => {
                                        return <Link key={index}>#{tag.name}</Link>;
                                    })
                                ) : (
                                    <span>There are no tags</span>
                                )}
                            </div>
                            <p className="mb-[10px]">{post.body}</p>
                            <p className="font-medium text-lg mb-[10px]">{post.user.firstName + ' ' + post.user.lastName}</p>
                            <p className="text-gray-700 mb-[18px]">Published: {formatDate(post.createdAt)}</p>
                            <Comment />
                        </div>
                        {/* RIGHT */}
                        <div className="w-full md:w-1/2 p-[10px]">
                            <img src={post.image} alt="" className="w-full h-full lg:h-[460px] object-cover rounded-lg" />
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
