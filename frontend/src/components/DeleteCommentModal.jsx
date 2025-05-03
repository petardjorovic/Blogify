import React from 'react';
import { IoClose } from 'react-icons/io5';
import { HiTrash } from 'react-icons/hi';

function DeletePostModal({ setIsDeleteCommentModal, handleDelete, comment }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50 fixed top-0 left-0 px-4 transition-all duration-300 ease-out">
            <div className="relative p-6 rounded-2xl text-center bg-white shadow-lg w-[320px] animate-fadeInScale">
                <button
                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[22px] p-1.5 ml-auto inline-flex items-center"
                    onClick={() => setIsDeleteCommentModal(false)}
                >
                    <IoClose />
                </button>
                <div className="text-backGray text-[50px] mb-[15px] mt-[10px] flex items-center justify-center">
                    <HiTrash />
                </div>
                <p className="mb-4 text-gray-500 text-center max-w-[80%] mx-auto">
                    Are you sure that you want to delete{' '}
                    <span className="font-medium">
                        {comment.user.firstName}'s comment: "{comment.body}"
                    </span>
                    ?
                </p>
                <div className="flex items-center justify-center space-x-4">
                    <button
                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                        onClick={() => setIsDeleteCommentModal(false)}
                    >
                        No, cancel
                    </button>
                    <button
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition duration-300 ease-in-out"
                        onClick={handleDelete}
                    >
                        Yes, I'm sure
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletePostModal;

<button
    data-modal-toggle="deleteModal"
    type="button"
    class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
>
    No, cancel
</button>;

<button
    type="button"
    class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
    data-modal-toggle="deleteModal"
>
    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
        ></path>
    </svg>
    <span class="sr-only">Close modal</span>
</button>;
