export const setPageNumber = (currentPage, pagesCount) => {
    let pages = Array(pagesCount)
        .fill()
        .map((_, i) => i + 1);

    if (pagesCount > 2) {
        if (currentPage === 1) {
            return [currentPage, currentPage + 1, currentPage + 2];
        } else if (currentPage === pagesCount) {
            return [currentPage - 2, currentPage - 1, currentPage];
        } else {
            return [currentPage - 1, currentPage, currentPage + 1];
        }
    } else {
        return pages;
    }
};
