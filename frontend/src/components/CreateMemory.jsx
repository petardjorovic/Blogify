import React, { useEffect, useRef, useState } from 'react';
import Input from './Input';
import Label from './Label';
import { getAllTags } from '../services/tagService';
import { imageValidation } from '../utils/imageValidation';
import { addNewPost } from '../services/postService';
import { toast } from 'react-toastify';
import TagsCOBox from './TagCOBox';
import { useDispatch } from 'react-redux';
import { showLoader } from '../store/loaderSlice';

function CreateMemory({ onPostCreated }) {
    const dispatch = useDispatch();
    const [tags, setTags] = useState([]);
    const [data, setData] = useState({
        body: '',
        title: '',
        tags: [],
        isPublic: true,
        image: '',
    });
    const [isTitle, setIsTitle] = useState(true);
    const [isBody, setIsBody] = useState(true);
    const [isTags, setIsTags] = useState(true);
    const [isImage, setIsImage] = useState(true);
    const [isImageValid, setIsImageValid] = useState(true);
    const imageInputRef = useRef();
    const [resetTags, setResetTags] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            dispatch(showLoader(true));
            const res = await getAllTags();
            dispatch(showLoader(false));
            if (res.status === 'success') setTags(res.tags);
        };
        fetchTags();
    }, [dispatch]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleImage = (e) => {
        setData({ ...data, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        !data.body ? setIsBody(false) : setIsBody(true);
        !data.title ? setIsTitle(false) : setIsTitle(true);
        data.tags.length === 0 ? setIsTags(false) : setIsTags(true);
        !data.image ? setIsImage(false) : setIsImage(true);
        imageValidation(data.image).status ? setIsImageValid(true) : setIsImageValid(false);
        if (!data.body || !data.title || data.tags.length === 0 || !data.image || !imageValidation(data.image).status) return;
        let formInputs = new FormData();
        let { image, ...userData } = data;
        formInputs.append('image', image);
        formInputs.append('data', JSON.stringify(userData));
        dispatch(showLoader(true));
        const res = await addNewPost(formInputs);
        dispatch(showLoader(false));
        if (res.status === 'success') {
            onPostCreated?.();
            setData({
                body: '',
                title: '',
                tags: [],
                isPublic: true,
                image: '',
            });
            imageInputRef.current.value = '';
            setResetTags(true);
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
        <div className="box w-full">
            <h3 className="font-semibold text-xl text-center mb-[12px]">Create memory</h3>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <label htmlFor="title" className={`px-[12px] ${!isTitle && 'text-red-600'}`}>
                    {isTitle ? 'Title' : 'Title is required'}
                </label>
                <Input
                    type={'text'}
                    id={'title'}
                    name={'title'}
                    placeholder="Title"
                    className={`border outline-none w-full rounded-md px-[12px] py-[5px] mb-[10px]`}
                    onChange={handleChange}
                    value={data.title}
                />
                <label htmlFor="body" className={`px-[12px] ${!isBody && 'text-red-600'}`}>
                    {isBody ? 'Message' : 'Message is required'}
                </label>
                <textarea
                    name="body"
                    id="body"
                    cols="30"
                    rows="10"
                    placeholder="Message"
                    className="border w-full rounded-md px-[12px] py-[5px] outline-none mb-[10px]"
                    onChange={handleChange}
                    value={data.body}
                ></textarea>
                <Label className={`px-[12px] ${!isTags && 'text-red-600'}`}>{isTags ? 'Tags' : 'You must add at least one tag'}</Label>
                {tags.length > 0 && <TagsCOBox tags={tags} setData={setData} data={data} resetTags={resetTags} />}
                <div className="flex items-center justify-center border py-[5px] rounded-md mt-[10px] gap-[40px] mb-[10px]">
                    <div className="bg-gray-400 px-[5px]  py-[2px] gap-[2px] flex items-center rounded-md select-none]">
                        <input
                            type="radio"
                            id="public"
                            name="isPublic"
                            onChange={() => setData({ ...data, isPublic: true })}
                            value={data.isPublic}
                            checked={data.isPublic}
                        />
                        <label htmlFor="public" className="text-sm">
                            Public
                        </label>
                    </div>
                    <div className="bg-gray-400 px-[5px]  py-[2px] gap-[2px] flex items-center rounded-md select-none">
                        <input
                            type="radio"
                            id="private"
                            name="isPublic"
                            onChange={() => setData({ ...data, isPublic: false })}
                            value={data.isPublic}
                        />
                        <label htmlFor="private" className="text-sm">
                            Private
                        </label>
                    </div>
                </div>
                <label htmlFor="browseFile" className={`px-[12px] ${(!isImage || !isImageValid) && 'text-red-600'}`}>
                    {isImage ? (isImageValid ? 'Image' : imageValidation(data.image).msg) : 'Image is required'}
                </label>
                <div className="border rounded-md flex flex-col">
                    <input
                        type="file"
                        name="chosenFile"
                        id="browseFile"
                        className=""
                        onChange={handleImage}
                        accept="image/*"
                        ref={imageInputRef}
                    />
                </div>
                <button type="submit" className="w-full px-[16px] py-[4px] bg-mainBlue text-white rounded-md mt-[10px]">
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateMemory;
