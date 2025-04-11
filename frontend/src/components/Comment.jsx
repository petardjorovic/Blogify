import { formatDatetime } from '../utils/formatDatetime';
import { FaRegTrashCan } from 'react-icons/fa6';

function Comment({ comment }) {
    return (
        <div className="relative pt-[15px] border-t pb-[7px]">
            <p className="font-semibold">
                {comment.user.firstName} {comment.user.lastName}
            </p>
            <p>{comment.body}</p>
            <p className="text-sm mt-[10px] text-slate-500 italic">{formatDatetime(comment.createdAt)}</p>
            <div className="absolute top-[10px] right-[10px] bg-red-600 p-[4px] text-sm rounded-full text-white flex items-center justify-center cursor-pointer">
                <FaRegTrashCan />
            </div>
        </div>
    );
}

export default Comment;
