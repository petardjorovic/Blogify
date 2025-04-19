import { useEffect, useState } from 'react';
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { setPageNumber } from '../utils/setPageNumber';

function Pagination({ itemsCount, itemsLimit, currentPage, setCurrentPage }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagesCount, setPagesCount] = useState(Math.ceil(itemsCount / itemsLimit));

    useEffect(() => {
        setSearchParams({ page: currentPage, limit: itemsLimit });
        setPagesCount(Math.ceil(itemsCount / itemsLimit));
    }, [currentPage, itemsLimit]);

    const handleNext = () => {
        if (currentPage < pagesCount) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex box items-center justify-center">
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
                    {setPageNumber(currentPage, pagesCount).map((page, index) => {
                        return (
                            <button
                                className={currentPage === page ? 'page-number-active' : 'page-number'}
                                key={index}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        );
                    })}
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
        </div>
    );
}

export default Pagination;
