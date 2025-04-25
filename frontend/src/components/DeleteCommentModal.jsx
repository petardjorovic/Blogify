import React from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

function DeletePostModal({ setIsDeleteCommentModal, handleDelete, comment }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50 fixed top-0 left-0">
            <div className="relative overflow-hidden rounded-md">
                <div className="absolute w-full bg-mainBlue h-[25px] rounded-t-md px-[10px] text-white">Delete comment</div>
                <div className="w-[300px] md:w-[450px] rounded-md bg-white p-[15px] mt-[15px] flex flex-col justify-between gap-[20px]">
                    <p>
                        Are you sure that you want to delete{' '}
                        <span className="font-medium">
                            {comment.user.firstName}'s comment: "{comment.body}"
                        </span>
                        ?
                    </p>
                    <div className="w-full flex items-center justify-between">
                        <button
                            className="px-[10px] py-[2px] bg-green-700 text-white rounded-md select-none"
                            onClick={() => setIsDeleteCommentModal(false)}
                        >
                            Cancel
                        </button>
                        <button className="px-[10px] py-[2px] bg-red-600 text-white rounded-md select-none" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
                <button
                    className="absolute top-[5px] rounded-sm right-[5px] text-white bg-red-600 font-extrabold"
                    onClick={() => setIsDeleteCommentModal(false)}
                >
                    <IoClose />
                </button>
            </div>
        </div>
    );
}

export default DeletePostModal;
