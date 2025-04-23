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
        // setSearchParams({ page: currentPage, limit: itemsLimit });

        setPagesCount(Math.ceil(itemsCount / itemsLimit));
        // searchParams.set('limit', itemsLimit);
        // searchParams.set('page', 1);
        // setSearchParams(searchParams);
    }, [itemsLimit]);

    const handleNext = () => {
        if (currentPage < pagesCount) {
            searchParams.set('page', currentPage + 1);
            searchParams.set('limit', itemsLimit);
            setSearchParams(searchParams);
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            searchParams.set('page', currentPage - 1);
            searchParams.set('limit', itemsLimit);
            setSearchParams(searchParams);
            setCurrentPage(currentPage - 1);
        }
    };

    const backToStart = () => {
        searchParams.set('page', 1);
        searchParams.set('limit', itemsLimit);
        setSearchParams(searchParams);
        setCurrentPage(1);
    };

    const handleCurrentPage = (page) => {
        searchParams.set('page', page);
        searchParams.set('limit', itemsLimit);
        setSearchParams(searchParams);
        setCurrentPage(page);
    };

    const goToEnd = () => {
        searchParams.set('page', pagesCount);
        searchParams.set('limit', itemsLimit);
        setSearchParams(searchParams);
        setCurrentPage(pagesCount);
    };

    return (
        <div className="flex box items-center justify-center">
            <div className="flex items-center">
                <div className="flex items-center">
                    <button className=" text-4xl" onClick={backToStart}>
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
                                onClick={() => handleCurrentPage(page)}
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
                    <button className="text-4xl" onClick={goToEnd}>
                        <MdOutlineKeyboardDoubleArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
