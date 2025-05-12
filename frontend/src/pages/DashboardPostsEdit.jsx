import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { toast } from 'react-toastify';
import { getDashboardSinglePostEdit } from '../services/dashboardService';

function DashboardPostsEdit() {
    const { user } = useSelector((state) => state.userStore);
    const { postId } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        tags: '',
        isPublic: true,
        image: '',
    });
    const [previewImage, setPreviewImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            dispatch(showLoader(true));
            const res = await getDashboardSinglePostEdit(postId);
            dispatch(showLoader(false));
            console.log(res);
            if (res.status === 'success') {
                const { title, body, tags, isPublic, image } = res.post;
                setFormData({
                    title,
                    body,
                    tags: tags.map((t) => t.name).join(', '),
                    isPublic,
                    image,
                });
            } else {
                toast.error('Failed to load post');
                navigate(`/dashboard/posts/${user._id}`);
            }
        };
        fetchPost();
    }, [dispatch, navigate, postId, user._id]);

    const handleChange = () => {};
    const handleSubmit = () => {};

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            {formData.title && (
                <div className="grid md:grid-cols-2 gap-6">
                    {' '}
                    {/* LEFT */}
                    <div>
                        <p>Image</p>
                        <div className="relative overflow-hidden rounded-md group h-[250px] md:h-[400px]">
                            <img
                                src={formData.image || previewImage}
                                alt="post_image"
                                className="object-cover w-full h-full transition duration-300 group-hover:brightness-75"
                            />
                            <label
                                htmlFor="image"
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition duration-300 bg-black bg-opacity-50 text-white font-semibold"
                                type="button"
                            >
                                Change Image
                            </label>
                            <input type="file" id="image" accept="image/*" className="hidden" />
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Post Title"
                                    className="border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="body">Message</label>
                                <textarea
                                    name="body"
                                    value={formData.body}
                                    onChange={handleChange}
                                    placeholder="Post Content"
                                    className="border p-2 rounded h-32"
                                ></textarea>
                            </div>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="Comma separated tags"
                                className="border p-2 rounded"
                            />
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
                                Public Post
                            </label>
                            <button type="submit" className="bg-mainBlue hover:bg-darkBlue text-white px-4 py-2 rounded transition">
                                Update Post
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardPostsEdit;
