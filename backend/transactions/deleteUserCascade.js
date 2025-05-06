const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const CustomError = require('../utils/CustomError');
const CommentModel = require('../models/CommentModel');
const LikeModel = require('../models/LikeModel');
const PostModel = require('../models/PostModel');
const cloudinary = require('cloudinary').v2;

const deleteUserCascade = async (userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Obrisi usera
        const user = await UserModel.findByIdAndDelete(userId).session(session);
        if (!user) throw new CustomError('User not found', 404);

        // 2. Obrisi komentare i lajkove koje je user ostavio
        await CommentModel.deleteMany({ 'user.id': userId }).session(session);
        await LikeModel.deleteMany({ userId }).session(session);

        // 3. Nadji njegove postove
        const posts = await PostModel.find({ userId }).session(session);
        const postsIds = posts.map((post) => post._id);

        if (postsIds.length > 0) {
            // 4. Obrisi komentare i lajkove na tim postovima
            await CommentModel.deleteMany({ postId: { $in: postsIds } }).session(session);
            await LikeModel.deleteMany({ postId: { $in: postsIds } }).session(session);
            // 5. Obrisi postove
            await PostModel.deleteMany({ _id: { $in: postsIds } }).session(session);
        }

        // Obrisi user image
        if (user.image !== 'https://res.cloudinary.com/dhfzyyycz/image/upload/v1745679699/avatar_cychqb.png') {
            const parts = user.image.split('/');
            const imageName = parts.pop().split('.')[0];
            const folderName = parts[parts.length - 1];
            await cloudinary.uploader.destroy(`${folderName}/${imageName}`);
        }

        // Obrisi posts images
        for (const post of posts) {
            if (post.image) {
                const parts = post.image.split('/');
                const imageName = parts.pop().split('.')[0];
                const folderName = parts[parts.length - 1];
                await cloudinary.uploader.destroy(`${folderName}/${imageName}`);
            }
        }

        // 6. Commit transakcije
        await session.commitTransaction();
        session.endSession();

        return { success: true };
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error(err, 'greska iz delete user cascade.');
        throw err; // baci dalje gresku
    }
};

module.exports = deleteUserCascade;
