import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { formatDate } from '../utils/formatDate';
import { routesConfig } from '../config/routesConfig';
import { useDispatch, useSelector } from 'react-redux';
import { handlePostLike } from '../services/likeService';
import { toast } from 'react-toastify';
import { showLoader } from '../store/loaderSlice';
import { FaRegTrashCan } from 'react-icons/fa6';
import DeletePostModal from '../components/DeletePostModal';
import useLockScroll from '../utils/useLockScroll';

function PostCard({ post, rerenderView }) {
    const { user } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();
    const [isDeletePostModal, setIsDeletePostModal] = useState(false);
    useLockScroll(isDeletePostModal);

    const handleLike = async (userLike) => {
        dispatch(showLoader(true));
        const res = await handlePostLike(post._id, userLike);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            rerenderView();
        } else {
            toast(res.message, {
                type: 'error',
                toastId: 1,
            });
        }
    };

    return (
        //
        <div className="w-full md:w-[220px] lg:w-[300px] h-[400px] rounded-lg relative shadow-custom">
            <div className="bg-black bg-opacity-70 w-full absolute top-0 left-0 rounded-t-lg text-white py-[3px] px-[5px]">
                <Link to={routesConfig.POST_AUTHOR.realPath(post.userId)}>
                    {post.user ? post.user.firstName + ' ' + post.user.lastName : 'Unknown'}
                </Link>
            </div>
            <img
                src={post.image.includes('uploads') ? 'http://localhost:4000/' + post.image : post.image}
                alt=""
                className="rounded-t-lg h-[45%] object-cover w-full"
            />
            <div className="flex flex-col h-[55%] justify-between">
                <div className="flex flex-col px-[15px] pt-[10px] items-start justify-start h-full">
                    <div className="">
                        {post.tags.map((tag, index) => {
                            return (
                                <Link to={routesConfig.POST_TAG.realPath(tag.name)} key={index} className="text-sm">
                                    #{tag.name}{' '}
                                </Link>
                            );
                        })}
                    </div>

                    <p className="font-medium text-sm lg:text-base">{post.title}</p>
                    <Link
                        to={routesConfig.SINGLE_POST.realPath(post._id)}
                        className={
                            'bg-mainBlue text-white w-full py-[6px] px-[12px] rounded-md text-center mt-auto hover:bg-darkBlue transition duration-300 ease-in-out'
                        }
                    >
                        Read More
                    </Link>
                </div>
                <div className="w-full bg-gray-100 px-[15px] h-[35px] rounded-b-lg border-t flex items-center justify-between mt-[12px]">
                    <span className="flex items-center gap-[6px] flex-row text-sm">
                        {post.likes.map((el) => el.userId).includes(user?._id) ? (
                            <BiSolidLike size={18} className="cursor-pointer" onClick={() => handleLike('dislike')} />
                        ) : (
                            <BiLike size={18} className="cursor-pointer" onClick={() => handleLike('like')} />
                        )}{' '}
                        {post.likes.length} {post.likes.length > 1 ? 'LIKES' : 'LIKE'}
                    </span>
                    <span className="text-sm">{formatDate(post.createdAt)}</span>
                </div>
            </div>
            {/* (user?.role === 'admin' || user?._id === post.userId) */}
            {user?.role === 'admin' && (
                <button
                    onClick={() => setIsDeletePostModal(true)}
                    className="absolute top-[-7px] right-[-7px] rounded-md text-sm p-[4px] bg-red-600 text-white outline-none"
                >
                    <FaRegTrashCan />
                </button>
            )}
            {isDeletePostModal && <DeletePostModal setIsDeletePostModal={setIsDeletePostModal} post={post} rerenderView={rerenderView} />}
        </div>
    );
}

export default PostCard;
