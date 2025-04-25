const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const CustomError = require('../utils/CustomError');

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new CustomError(
                'Invalid image type or image are bigger than 500KB. Allowed types are: JPG, PNG, WEBP, GIF, BMP,TIFF and SVG.',
                400
            ),
            false
        );
    }
};

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'post_images', // ime foldera na cloudinary-ju
        public_id: (req, file) => {
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 15);
            const originalName = file.originalname.split('.')[0];
            const fileExtension = file.originalname.split('.').pop();
            return `${originalName}_${timestamp}_${randomString}`;
        },
    },
});

const parser = multer({ storage, fileFilter });

module.exports = parser;
