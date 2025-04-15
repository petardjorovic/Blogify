import React, { useEffect, useState } from 'react';
import Input from './Input';
import Label from './Label';
import { getAllTags } from '../services/tagService';

function CreateMemory() {
    const [tags, setTags] = useState([]);
    const [data, setData] = useState({
        body: '',
        title: '',
        tags: [],
        isPublic: true,
    });
    const [file, setFile] = useState('');

    useEffect(() => {
        const fetchTags = async () => {
            const res = await getAllTags();
            if (res.status === 'success') setTags(res.tags);
        };
        fetchTags();
    }, []);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data, 'data');
    };
    return (
        <div className="box w-full">
            <h3 className="font-semibold text-xl text-center mb-[12px]">Create memory</h3>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <Input
                    type={'text'}
                    name={'title'}
                    placeholder={'Title'}
                    className={'border w-full rounded-md px-[12px] py-[5px] mb-[10px]'}
                    onChange={handleChange}
                    value={data.title}
                />
                <textarea
                    name="body"
                    id="body"
                    cols="30"
                    rows="10"
                    placeholder="Message"
                    className="border w-full rounded-md px-[12px] py-[5px]"
                    onChange={handleChange}
                    value={data.body}
                ></textarea>
                <Label>Tags</Label>
                {tags.length > 0 && <TagsCO tags={tags} setData={setData} data={data} />}
                <div className="flex items-center justify-center border py-[5px] rounded-md mt-[10px] gap-[40px]">
                    <div className="bg-gray-400 px-[5px]  py-[2px] gap-[2px] flex items-center rounded-md select-none">
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
                <div className="border rounded-md outline-none mt-[10px]">
                    <input type="file" name="chosenFile" id="browseFile" className="" />
                </div>
                <button type="submit" className="w-full px-[16px] py-[4px] bg-mainBlue text-white rounded-md mt-[10px]">
                    Create
                </button>
            </form>
        </div>
    );
}

function TagsCO({ tags, setData, data }) {
    const handleTagChange = (e) => {
        let newArr = [...data.tags];
        if (newArr.includes(e.target.value)) {
            newArr = newArr.filter((tag) => tag !== e.target.value);
        } else {
            newArr.push(e.target.value);
        }
        setData({ ...data, tags: newArr });
    };
    return (
        <div className="w-full border rounded-md flex items-center gap-[10px] flex-wrap p-[15px] mt-[15px]">
            {tags.map((tag) => {
                return (
                    <div key={tag._id} className="bg-gray-400 px-[5px]  py-[2px] gap-[2px] flex items-center rounded-md select-none">
                        <input type="checkbox" id={tag._id} onChange={handleTagChange} value={tag.name} />
                        <label htmlFor={tag._id} className="text-sm">
                            #{tag.name}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}

export default CreateMemory;
