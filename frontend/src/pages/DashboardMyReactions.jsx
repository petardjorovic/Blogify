import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { useEffect, useState } from 'react';
import { formatDatetime } from '../utils/formatDatetime';
import { Link } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { getDashboardUserReactionsLikes } from '../services/dashboardService';
import { getDashboardUserReactionsComments } from '../services/dashboardService';
import { getPaginationPages } from '../utils/getPaginationPages';

function DashboardMyReactions() {
    const [activeTab, setActiveTab] = useState('likes');
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        const fecthData = async () => {
            let res;
            dispatch(showLoader(true));
            if (activeTab === 'likes') {
                res = await getDashboardUserReactionsLikes(page, limit);
            } else {
                res = await getDashboardUserReactionsComments(page, limit);
            }
            dispatch(showLoader(false));

            if (res.status === 'success') {
                if (activeTab === 'likes') {
                    setLikes(res.likes);
                    setTotal(res.total);
                } else {
                    setComments(res.comments);
                    setTotal(res.total);
                }
            }
        };
        fecthData();
    }, [activeTab, page, dispatch, limit]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(1);
    };

    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <div className="bg-white sticky top-[70px] pt-[10px] pb-[30px]">
                <h1 className="text-2xl font-bold mb-1">My Reactions</h1>
                <p className="text-gray-500 mb-6">Posts you've liked and commented on</p>

                {/* === Tabs === */}
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                    <button
                        onClick={() => handleTabChange('likes')}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                            activeTab === 'likes' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Liked Posts
                    </button>
                    <button
                        onClick={() => handleTabChange('comments')}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                            activeTab === 'comments' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Comments
                    </button>
                </div>
            </div>

            {/* === Content === */}
            {activeTab === 'likes' ? (
                <div className="">
                    {likes.length === 0 ? (
                        <p className="text-gray-400 italic">You haven't liked any posts yet.</p>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {likes.map((like) => (
                                <div key={like._id} className="border rounded-lg p-4 hover:shadow-md transition">
                                    <h3 className="text-lg font-semibold">{like.post?.title || 'Unknown'}</h3>
                                    <p className="text-sm text-gray-500">
                                        By {like.post?.user.firstName || 'Unknown'} {like.post?.user.lastName || 'Unknown'}
                                    </p>
                                    <p className="text-xs text-gray-400 mb-2">{formatDatetime(like.post?.createdAt)}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <Link
                                            to={routesConfig.SINGLE_POST.realPath(like.post?._id)}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            Go to post →
                                        </Link>
                                        <button className="text-xs text-red-500 hover:text-red-600">Remove Like</button>
                                    </div>
                                    <p className="text-[11px] text-gray-400 mt-2 italic">
                                        You liked this post on {formatDatetime(like.createdAt)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="">
                    {comments.length === 0 ? (
                        <p className="text-gray-400 italic">You haven't commented on any posts yet.</p>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {comments.map((comment) => (
                                <div key={comment._id} className="border rounded-lg p-4 hover:shadow-md transition">
                                    <p className="text-gray-800 mb-2">“{comment.body}”</p>
                                    <p className="text-sm text-gray-500">
                                        On post:{' '}
                                        <Link
                                            to={routesConfig.SINGLE_POST.realPath(comment.post._id)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {comment.post.title}
                                        </Link>
                                    </p>
                                    <div className="mt-2 flex justify-between text-xs text-gray-400">
                                        <span>{formatDatetime(comment.createdAt)}</span>
                                        <button className="text-red-500 hover:text-red-600">Delete Comment</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <div className="flex flex-wrap justify-center items-center gap-2 my-6">
                <button
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-md shadow-sm text-sm ${
                        page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    First
                </button>

                <button
                    onClick={previousPage}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-md shadow-sm text-sm ${
                        page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    Prev
                </button>
                {getPaginationPages(page, totalPages).map((p, i) =>
                    p === '...' ? (
                        <span key={i} className="px-2 text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={i}
                            onClick={() => setPage(p)}
                            className={`px-3 py-1 rounded-md text-sm ${
                                p === page ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                            }`}
                        >
                            {p}
                        </button>
                    )
                )}
                <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded-md shadow-sm text-sm transition-colors duration-200 ${
                        page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    Next
                </button>
                <button
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded-md shadow-sm text-sm ${
                        page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    Last
                </button>
            </div>
        </div>
    );
}

export default DashboardMyReactions;
