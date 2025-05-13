import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../store/loaderSlice';
import { toast } from 'react-toastify';
import { getDashboardSinglePostEdit, updatePostImage, updatePostInfo } from '../services/dashboardService';
import { imageValidation } from '../utils/imageValidation';
import { validatePostTitle } from '../utils/validatePostTitle';
import { isArrayEquals } from '../utils/isArrayEquals';

function DashboardPostsEdit() {
    const { user } = useSelector((state) => state.userStore);
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        tags: '',
        isPublic: true,
    });
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageLabel, setImageLabel] = useState('image');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            dispatch(showLoader(true));
            const res = await getDashboardSinglePostEdit(postId);
            dispatch(showLoader(false));
            if (res.status === 'success') {
                const { title, body, tags, isPublic, image } = res.post;
                setFormData({
                    title,
                    body,
                    tags: tags.map((t) => t.name),
                    isPublic,
                });
                setPost(res.post);
                setImage(image);
                setTags(res.tags);
            } else {
                toast.error('Failed to load post');
                navigate(`/dashboard/posts/${user._id}`);
            }
        };
        fetchPost();
    }, [dispatch, navigate, postId, user?._id]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!imageValidation(file).status) {
            toast.error(imageValidation(file).msg);
            return;
        }
        // Prikaz preview slike odmah
        const localImageUrl = URL.createObjectURL(file);
        setPreviewImage(localImageUrl);

        const formData = new FormData();
        formData.append('image', file);
        setImageLabel('');
        const res = await updatePostImage(formData, postId, image);
        console.log(res, 'res sa fronta update post image');
        if (res.status === 'success') {
            setImageLabel('image');
            setImage(res.image);
            toast.success(res.message);
        } else {
            toast.error(res.message);
            setImageLabel('image');
            setPreviewImage(image); // Vrati staru sliku
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagChange = (e) => {
        let newArr = [...formData.tags];
        if (newArr.includes(e.target.value)) {
            newArr = newArr.filter((tag) => tag !== e.target.value);
        } else {
            newArr.push(e.target.value);
        }
        setFormData((prev) => ({ ...prev, tags: newArr }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePostTitle(formData.title).status || !formData.body || formData.tags.length === 0) return;
        const oldTags = post.tags.map((t) => t.name);

        if (
            formData.title.trim() === post.title &&
            formData.body.trim() === post.body &&
            isArrayEquals(oldTags, formData.tags) &&
            formData.isPublic === post.isPublic
        ) {
            return;
        }

        dispatch(showLoader(true));
        const res = await updatePostInfo(formData, post._id);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            const { title, body, tags, isPublic, image } = res.post;
            setFormData({
                title,
                body,
                tags: tags.map((t) => t.name),
                isPublic,
            });
            setPost(res.post);
            setImage(image);
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            {Object.hasOwn(post, '_id') && (
                <div className="grid md:grid-cols-2 gap-6">
                    {' '}
                    {/* LEFT */}
                    <div>
                        <p>Image</p>
                        <div className="relative overflow-hidden rounded-md group h-[250px] md:h-[400px]">
                            <img
                                src={previewImage || image}
                                alt="post_image"
                                className="object-cover w-full h-full transition duration-300 group-hover:brightness-75"
                            />
                            <label
                                htmlFor={imageLabel}
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition duration-300 bg-black bg-opacity-50 text-white font-semibold"
                                type="button"
                            >
                                Change Image
                            </label>
                            <input type="file" id="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="title" className={`${!validatePostTitle(formData.title).status && 'text-red-600'}`}>
                                    {validatePostTitle(formData.title).status ? 'Title' : validatePostTitle(formData.title).message}
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Post Title"
                                    className="border p-2 rounded"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="body" className={`${!formData.body && 'text-red-600'}`}>
                                    {formData.body ? 'Message' : 'Message is required.'}
                                </label>
                                <textarea
                                    name="body"
                                    value={formData.body}
                                    onChange={handleChange}
                                    placeholder="Post Content"
                                    className="border p-2 rounded h-32"
                                ></textarea>
                            </div>
                            {tags.length > 0 && (
                                <div className="w-full flex flex-col gap-[5px] border rounded-md p-[10px]">
                                    <p className={`${formData.tags.length === 0 && 'text-red-600'}`}>
                                        {formData.tags.length > 0 ? 'Tags' : 'You have to add at least one tag'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag) => {
                                            return (
                                                <div
                                                    key={tag._id}
                                                    className="bg-gray-400 px-[5px] py-[2px] gap-[2px] flex items-center rounded-md select-none"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={tag._id}
                                                        onChange={handleTagChange}
                                                        value={tag.name}
                                                        checked={formData.tags.includes(tag.name)}
                                                    />
                                                    <label htmlFor={tag._id} className="text-sm">
                                                        #{tag.name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-center border py-[5px] rounded-md gap-[40px] mb-[10px]">
                                <div className="bg-gray-400 px-[5px]  py-[2px] gap-[2px] flex items-center rounded-md select-none]">
                                    <input
                                        type="radio"
                                        id="public"
                                        name="isPublic"
                                        onChange={() => setFormData((prev) => ({ ...prev, isPublic: true }))}
                                        value={true}
                                        checked={formData.isPublic === true}
                                    />
                                    <label htmlFor="public" className="text-sm">
                                        Public
                                    </label>
                                </div>
                                <div className="bg-gray-400 px-[5px] py-[2px] gap-[2px] flex items-center rounded-md select-none">
                                    <input
                                        type="radio"
                                        id="private"
                                        name="isPublic"
                                        onChange={() => setFormData((prev) => ({ ...prev, isPublic: false }))}
                                        value={false}
                                        checked={formData.isPublic === false}
                                    />
                                    <label htmlFor="private" className="text-sm">
                                        Private
                                    </label>
                                </div>
                            </div>
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
