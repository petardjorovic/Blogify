import { useEffect } from 'react';

function TagsCOBox({ tags, setData, data, resetTags }) {
    const handleTagChange = (e) => {
        let newArr = [...data.tags];
        if (newArr.includes(e.target.value)) {
            newArr = newArr.filter((tag) => tag !== e.target.value);
        } else {
            newArr.push(e.target.value);
        }
        setData({ ...data, tags: newArr });
    };

    useEffect(() => {
        if (resetTags) {
            setData((prev) => ({ ...prev, tags: [] }));
        }
    }, [resetTags]);
    return (
        <div className="w-full border rounded-md flex items-center gap-[10px] flex-wrap p-[15px]">
            {tags.map((tag) => {
                return (
                    <div key={tag._id} className="bg-gray-400 px-[5px]  py-[2px] gap-[2px] flex items-center rounded-md select-none">
                        <input
                            type="checkbox"
                            id={tag._id}
                            onChange={handleTagChange}
                            value={tag.name}
                            checked={data.tags.includes(tag.name)}
                        />
                        <label htmlFor={tag._id} className="text-sm">
                            #{tag.name}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}

export default TagsCOBox;
