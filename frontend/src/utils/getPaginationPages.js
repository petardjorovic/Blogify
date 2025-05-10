export const getPaginationPages = (currentPage, totalPages, delta = 1) => {
    const range = [];

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
            range.push(i);
        }
    }

    const pagination = [];
    let last;

    for (const page of range) {
        if (last && page - last > 1) {
            pagination.push('...');
        }
        pagination.push(page);
        last = page;
    }

    return pagination;

    // return Array.from({ length: totalPages }, (_, i) => i + 1)
    //     .filter((p) => Math.abs(p - currentPage) <= delta || p === 1 || p === totalPages)
    //     .reduce((acc, curr, idx, arr) => {
    //         if (idx > 0 && curr - arr[idx - 1] > 1) {
    //             arr.push('...');
    //         }
    //         arr.push(curr);
    //         return arr;
    //     }, []);
};
