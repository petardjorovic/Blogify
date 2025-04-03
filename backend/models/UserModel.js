const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: [true, 'Password iz required'],
        select: false,
        // validate: {
        //     validator: (field) => {
        //         //* Password must contain one lowercase letter, one uppercase letter,
        //         //* one digit from 0 to 9, one special character, no space, and it must be 8-16 characters long.
        //         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)(?!.* ).{8,16}$/;
        //         return passwordRegex.test(field);
        //     },
        //     message: 'Password is not valid',
        // },
    },
    gender: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: 'avatar.png',
    },
    birthDate: {
        type: Date,
        default: null,
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: () => new Date().getTime(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    activate: {
        type: Boolean,
        default: false,
    },
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
