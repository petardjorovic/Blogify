import { toast } from 'react-toastify';
import { deleteComment } from '../services/commentService';
import { formatDatetime } from '../utils/formatDatetime';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { useState } from 'react';
import DeleteCommentModal from '../components/DeleteCommentModal';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

function Comment({ comment, rerenderView, postAuthorId, user, indexKey }) {
    const [expanded, setExpanded] = useState([0]);
    const [autoClose, setAutoClose] = useState(true);
    const dispatch = useDispatch();
    const [isDeleteCommentModal, setIsDeleteCommentModal] = useState(false);

    const handleDelete = async () => {
        setIsDeleteCommentModal(false);
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
    const toggleHandler = () => {
        if (autoClose) {
            if (expanded.includes(indexKey)) {
                setExpanded((prev) => prev.filter((el) => el !== indexKey));
            } else {
                setExpanded([...expanded, indexKey]);
            }
        } else {
            if (expanded.includes(indexKey)) {
                setExpanded([]);
            } else {
                setExpanded([indexKey]);
            }
        }
    };
    const isOpen = expanded.includes(indexKey);

    return (
        <div className="relative mb-[5px]">
            <div
                onClick={toggleHandler}
                className="font-semibold bg-lightGrey border-[2px] border-borderGray py-[5px] px-[10px] rounded-t-md cursor-pointer flex items-center justify-between"
            >
                <p>
                    {comment.user.firstName} {comment.user.lastName}{' '}
                </p>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <IoIosArrowDown />
                </motion.span>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key={'content'}
                        initial={{ height: 0 }}
                        animate={{ height: isOpen ? 'auto' : 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        exit={{ height: 0 }}
                        className="border-[2px] border-t-0 border-borderGray rounded-b-md overflow-hidden"
                    >
                        <div className="py-[5px] px-[10px]">
                            <p>{comment.body}</p>
                            <div className="flex flex-col items-start lg:flex-row justify-between mt-[5px]">
                                <p className="flex items-center text-slate-500">
                                    {user.role === 'admin' || user._id === comment.user.id || user._id === postAuthorId ? (
                                        <span
                                            className="text-sm text-gray-500 hover:text-green-600 select-none font-medium cursor-pointer transition duration-300 ease-in-out"
                                            onClick={() => setIsDeleteCommentModal(true)}
                                        >
                                            Remove
                                        </span>
                                    ) : (
                                        <span className="text-sm text-gray-500 transition select-none duration-300 ease-in-out">
                                            Remove
                                        </span>
                                    )}
                                    &nbsp;•&nbsp;
                                    <span className="text-sm text-gray-500 select-none transition duration-300 ease-in-out">Reply</span>
                                    &nbsp;•&nbsp;
                                    <span className="text-sm text-gray-500 select-none transition duration-300 ease-in-out">Translate</span>
                                </p>
                                <p className="text-sm text-slate-500 italic text-end">{formatDatetime(comment.createdAt)}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {isDeleteCommentModal && (
                <DeleteCommentModal setIsDeleteCommentModal={setIsDeleteCommentModal} handleDelete={handleDelete} comment={comment} />
            )}
        </div>
    );
}

export default Comment;
