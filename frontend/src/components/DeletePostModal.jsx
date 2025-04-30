import { useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { HiTrash } from 'react-icons/hi';
import { showLoader } from '../store/loaderSlice';
import { deleteSinglePost } from '../services/postService';
import { toast } from 'react-toastify';

function DeletePostModal({ setIsDeletePostModal, post, rerenderView }) {
    const dispatch = useDispatch();

    const handleDeletePost = async () => {
        setIsDeletePostModal(false);
        dispatch(showLoader(true));
        const res = await deleteSinglePost(post._id, post.userId);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            rerenderView();
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50 fixed top-0 left-0 px-[16px]">
            <div className="relative p-4 rounded-lg text-center bg-white shadow">
                <button
                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[22px] p-1.5 ml-auto inline-flex items-center"
                    onClick={() => setIsDeletePostModal(false)}
                >
                    <IoClose />
                </button>
                <div className="text-backGray text-[50px] mb-[15px] mt-[10px] flex items-center justify-center">
                    <HiTrash />
                </div>
                <p className="mb-4 text-gray-500 text-center max-w-[80%] mx-auto">
                    Are you sure that you want to delete{' '}
                    <span className="font-medium">
                        {post.user?.firstName}'s comment: "{post.title}"
                    </span>
                    ?
                </p>
                <div className="flex items-center justify-center space-x-4">
                    <button
                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                        onClick={() => setIsDeletePostModal(false)}
                    >
                        No, cancel
                    </button>
                    <button
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition duration-300 ease-in-out"
                        onClick={handleDeletePost}
                    >
                        Yes, I'm sure
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletePostModal;
