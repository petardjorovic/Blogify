const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
    {
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
        confirmPassword: {
            type: String,
            required: [true, 'Confirm password is required'],
            validate: {
                // This validator will only work for save() & create()
                validator: function (field) {
                    return field == this.password;
                },
                message: 'Password and Confirm password does not match',
            },
        },
        gender: {
            type: String,
            default: null,
        },
        age: {
            type: Number,
            default: null,
        },
        image: {
            type: String,
            default: 'uploads/users/avatar.png',
        },
        birthDate: {
            type: Date,
            default: null,
        },
        role: {
            type: String,
            default: 'user',
        },
        activate: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
});

userSchema.methods.isPasswordCorrect = async (candidatePassword, currentPassword) => {
    return await bcrypt.compare(candidatePassword, currentPassword);
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
