export const imageValidation = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (file.size > 524288) return { status: false, msg: 'Image size must not be bigger than 500 KB' };
    if (!allowedTypes.includes(file.type)) return { status: false, msg: 'Allowed types are: JPG, PNG, WEBP, GIF, SVG.' };
    return { status: true, msg: 'Image' };
};
