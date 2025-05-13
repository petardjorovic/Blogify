export const validatePostTitle = (title) => {
    if (!title.trim()) {
        return { status: false, message: 'Title is required.' };
    }

    if (title.length > 100) {
        return { status: false, message: 'Title cannot contain more than 100 characters.' };
    }

    if (/[\p{Emoji}]/gu.test(title)) {
        return { status: false, message: 'Title cannot contain emoji.' };
    }

    return { status: true }; // validan naslov
};
