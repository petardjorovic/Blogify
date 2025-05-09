import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';
import { getDashboardUserReactions } from '../services/dashboardService';

function DashboardMyReactions() {
    const [likedPosts, setLikedPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fecthData = async () => {
            dispatch(showLoader(true));
            const res = await getDashboardUserReactions();
            dispatch(showLoader(false));
            console.log(res, 'res sa fronta');
        };
        fecthData();
    }, []);

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-1">My reactions</h1>
            <p className="text-gray-600 mb-6">Posts you've liked and commented on</p>

            {/* Liked Posts Section */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Liked Posts</h2>

                {likedPosts.length === 0 ? (
                    <p className="text-gray-400 italic">You haven't liked any posts yet.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {likedPosts.map((post) => {
                            return (
                                <div className="border rounded-lg p-4 hover:shadow-md transition" key={post._id}>
                                    <h3 className="text-lg font-semibold">{post.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        {post.user?.firstName} {post.user?.lastName}
                                    </p>
                                    <p className="text-xs text-gray-400 mb-2">{formatDate(post.createdAt)}</p>
                                    <Link
                                        to={routesConfig.SINGLE_POST.realPath(post._id)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Go to post →
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* === Comments Section === */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Your Comments</h2>

                {comments.length === 0 ? (
                    <p className="text-gray-400 italic">You haven't commented on any posts yet.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {comments.map((comment) => {
                            return (
                                <div className="border rounded-lg p-4 hover:shadow-md transition" key={comment._id}>
                                    <p className="text-gray-800 mb-2">"{comment.body}"</p>
                                    <p className="text-sm text-gray-500">
                                        On post{' '}
                                        <Link
                                            className="text-blue-600 hover:underline"
                                            to={routesConfig.SINGLE_POST.realPath(comment.postId)}
                                        >
                                            {comment.post.title}
                                        </Link>
                                    </p>
                                    <p className="text-xs text-gray-400">formatDate(comment.createdAt)</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}

export default DashboardMyReactions;
