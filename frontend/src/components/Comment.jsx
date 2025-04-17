import { toast } from 'react-toastify';
import { deleteComment } from '../services/commentService';
import { formatDatetime } from '../utils/formatDatetime';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';

function Comment({ comment, rerenderView, postAuthorId, user }) {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        dispatch(showLoader(true));
        const res = await deleteComment(comment._id);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            rerenderView();
            toast(res.message, {
                type: 'success',
                toastId: 1,
            });
        } else {
            toast(res.message, {
                type: 'error',
                toastId: 1,
            });
        }
    };
    return (
        <div className="relative pt-[15px] border-t pb-[7px]">
            <p className="font-semibold">
                {comment.user.firstName} {comment.user.lastName}
            </p>
            <p>{comment.body}</p>
            <p className="text-sm mt-[10px] text-slate-500 italic">{formatDatetime(comment.createdAt)}</p>
            {user.role === 'admin' || user._id === comment.user.id || user._id === postAuthorId ? (
                <div
                    className="absolute top-[10px] right-[10px] bg-red-600 p-[4px] text-sm rounded-full text-white flex items-center justify-center cursor-pointer"
                    onClick={handleDelete}
                >
                    <FaRegTrashCan />
                </div>
            ) : null}
        </div>
    );
}

export default Comment;
