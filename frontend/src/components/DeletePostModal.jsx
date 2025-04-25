import { useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { showLoader } from '../store/loaderSlice';
import { deleteSinglePost } from '../services/postService';
import { toast } from 'react-toastify';

function DeletePostModal({ setIsDeletePostModal, post, rerenderView }) {
    const dispatch = useDispatch();

    const handleDeletePost = async () => {
        setIsDeletePostModal(false);
        dispatch(showLoader(true));
        const res = await deleteSinglePost(post._id);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            rerenderView();
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 z-50 fixed top-0 left-0">
            <div className="relative overflow-hidden rounded-md">
                <div className="absolute w-full bg-mainBlue h-[25px] rounded-t-md px-[10px] text-white">Delete Post</div>
                <div className="w-[300px] md:w-[450px] rounded-md bg-white p-[15px] mt-[15px] flex flex-col justify-between items-center gap-[20px]">
                    <p>
                        Are you sure that you want to delete{' '}
                        <span className="font-medium">
                            {post.user?.firstName}'s post: "{post.title}"
                        </span>
                        ?
                    </p>
                    <div className="w-full flex items-center justify-between">
                        <button
                            onClick={() => setIsDeletePostModal(false)}
                            className="px-[10px] py-[2px] bg-green-700 text-white rounded-md select-none"
                        >
                            Cancel
                        </button>
                        <button className="px-[10px] py-[2px] bg-red-600 text-white rounded-md select-none" onClick={handleDeletePost}>
                            Delete
                        </button>
                    </div>
                </div>
                <button
                    className="absolute top-[5px] rounded-sm right-[5px] text-white bg-red-600 font-extrabold"
                    onClick={() => setIsDeletePostModal(false)}
                >
                    <IoClose />
                </button>
            </div>
        </div>
    );
}

export default DeletePostModal;
