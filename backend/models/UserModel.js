const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

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
            validate: [validator.isEmail, 'Email is not valid'],
        },
        password: {
            type: String,
            required: [true, 'Password iz required'],
            select: false,
            min: 4,
            // validate: {
            //     validator: (field) => {
            //         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)(?!.* ).{8,16}$/;
            //         return passwordRegex.test(field);
            //     },
            //     message: 'Password must contain one lowercase letter, one uppercase letter,one digit from 0 to 9, one special character, no space, and it must be 8-16 characters long.
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
                message: 'Password & Confirm Password does not match',
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
            default: 'https://res.cloudinary.com/dhfzyyycz/image/upload/v1745679699/avatar_cychqb.png',
        },
        birthDate: {
            type: Date,
            default: null,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        activate: {
            type: Boolean,
            default: false,
        },
        passwordChangedAt: { type: Date },
        passwordResetToken: { type: String },
        passwordResetTokenExpires: { type: Date },
        pendingEmail: { type: String },
        pendingEmailToken: { type: String },
        pendingEmailTokenExpires: { type: Date },
        emailChangedAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    next();
});

userSchema.methods.isPasswordCorrect = async (candidatePassword, currentPassword) => {
    return await bcrypt.compare(candidatePassword, currentPassword);
};

userSchema.methods.isPasswordChanged = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    // return false, jer passwordChanged ne postoji i samim tim nije promenjena lozinka posle izdavanja tokena
    return false;
};

userSchema.methods.isEmailChanged = function (JWTTimestamp) {
    if (this.emailChangedAt) {
        const changedTimestamp = parseInt(this.emailChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    return false;
};

userSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

userSchema.methods.createPendingEmailToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.pendingEmailToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.pendingEmailTokenExpires = Date.now() + 60 * 60 * 1000;

    return resetToken;
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
