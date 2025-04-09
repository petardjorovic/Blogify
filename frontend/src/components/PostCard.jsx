import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { SlLike } from 'react-icons/sl';
import { formatDate } from '../utils/formatDate';

function PostCard({ post }) {
    return (
        <div className="w-[250px] lg:w-[31%] h-[400px] border rounded-lg relative shadow-custom overflow-hidden">
            <img src={post.image} alt="" className="rounded-t-lg h-[45%] object-cover w-full" />
            <div className="bg-black bg-opacity-50 w-full absolute top-0 left-0 rounded-t-lg text-white py-[2px] px-[5px]">
                {post.user ? post.user.firstName + ' ' + post.user.lastName : 'Unknown'}
            </div>
            <div className="flex flex-col border h-[55%] justify-between">
                <div className="flex flex-col px-[15px] pt-[10px] items-start justify-start h-full">
                    <div className="">
                        {post.tags.map((tag, index) => {
                            return (
                                <Link key={index} className="text-sm">
                                    #{tag.name}{' '}
                                </Link>
                            );
                        })}
                    </div>

                    <p className="font-medium text-sm lg:text-base">{post.title}</p>
                    <Link
                        className={
                            'bg-mainBlue text-white w-full py-[6px] px-[12px] rounded-md text-center mt-auto hover:bg-darkBlue transition duration-300 ease-in-out'
                        }
                    >
                        Read More
                    </Link>
                </div>
                <div className="w-full bg-gray-100 px-[15px] h-[35px] rounded-b-lg border-t flex items-center justify-between mt-2">
                    <span className="flex items-center gap-[6px] flex-row text-sm">
                        <SlLike /> {post.reactions} LIKE
                    </span>
                    <span className="text-sm">{formatDate(post.createdAt)}</span>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
