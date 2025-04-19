export const setPageNumber = (currentPage, pagesCount) => {
    if (currentPage === 1) {
        return [currentPage, currentPage + 1, currentPage + 2];
    } else if (currentPage === pagesCount) {
        return [currentPage - 2, currentPage - 1, currentPage];
    } else {
        return [currentPage - 1, currentPage, currentPage + 1];
    }
};
