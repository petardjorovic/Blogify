import { useEffect, useState } from 'react';
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

function Pagination({ itemsCount }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemsLimit, setItemsLimit] = useState(12);
    const [pagesCount, setPagesCount] = useState(Math.ceil(itemsCount / itemsLimit));
    const [currentPage, setCurrentPage] = useState(1);

    // useEffect(() => {
    //     // searchParams.set('page', currentPage);
    //     // searchParams.set('limit', itemsLimit);
    //     setSearchParams({ page: currentPage, limit: itemsLimit });
    // }, []);

    useEffect(() => {
        setSearchParams({ page: currentPage, limit: itemsLimit });
    }, [currentPage, itemsLimit]);

    const handleNext = () => {
        if (currentPage < pagesCount) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex box items-center justify-center relative">
            <div className="flex items-center">
                <div className="flex items-center">
                    <button className=" text-4xl" onClick={() => setCurrentPage(1)}>
                        <MdOutlineKeyboardDoubleArrowLeft />
                    </button>
                    <button className="text-4xl" onClick={handlePrevious}>
                        <MdOutlineKeyboardArrowLeft />
                    </button>
                </div>
                <div className="flex items-center gap-[5px]">
                    <button className="page-number-active">1</button>
                    <button className="page-number">2</button>
                    <button className="page-number">3</button>
                </div>
                <div className="flex items-center">
                    <button className="text-4xl" onClick={handleNext}>
                        <MdOutlineKeyboardArrowRight />
                    </button>
                    <button className="text-4xl" onClick={() => setCurrentPage(pagesCount)}>
                        <MdOutlineKeyboardDoubleArrowRight />
                    </button>
                </div>
            </div>
            <div className="w-[45px] border border-gray-400 rounded-md overflow-hidden absolute right-[20px] my-auto">
                <select
                    name="itemsLimit"
                    id="itemsLimit"
                    value={itemsLimit}
                    onChange={(e) => setItemsLimit(e.target.value)}
                    className="outline-none w-full"
                >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                </select>
            </div>
        </div>
    );
}

export default Pagination;
