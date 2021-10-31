import fs from 'fs';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


import User from '../models/user';
import PostMessage from '../models/post.js';

import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import Email from '../utils/email';


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

export const login = catchAsync(async (req, res, next) => {
    const { password, email } = req.body;

    if (!password || !email) {
        return next(new AppError("Please Provide Email or Password", 400));
    }

    const oldUser = await User.findOne({ email });

    if (!oldUser) {
        return next(new AppError("Email or password is wrong", 400));
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

    if (!isPasswordCorrect) {
        return next(new AppError("Email or password is wrong", 400));
    }

    const token = signToken(oldUser._id);

    // console.log("OldUser", oldUser);

    res.status(200).json({
        userData: oldUser,
        token
    })


})

export const signup = catchAsync(async (req, res, next) => {
    const { firstName, lastName, name, email, password, confirmPassword } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return next(new AppError("User is already registered", 400));
    }

    if (password !== confirmPassword) {
        return next(new AppError("Password in not same", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        firstName,
        lastName,
        name,
        email,
        password: hashedPassword,
    });

    const token = signToken(user._id);

    res.status(200).json({ userData: user, token });

});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};


export const updateMe = catchAsync(async (req, res, next) => {

    // console.log(req.body);

    const filteredBody = filterObj(req.body, 'firstName', "lastName", 'email');
    if (req.file) filteredBody.userImage = req.file.filename;

    const user = await User.findById(req.userId);

    if (req.file && user.userImage)
        fs.unlink(`./public/img/users/${user.userImage}`, function (err) {
            if (err) console.log(err);
        })

    filteredBody.name = filteredBody.firstName + ' ' + filteredBody.lastName;

    const updatedUser = await User.findByIdAndUpdate(req.userId, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ userData: updatedUser });
})

export const updatePassword = catchAsync(async (req, res, next) => {
    const { passwordCurrent, password, confirmPassword } = req.body;

    const oldUser = await User.findById(req.userId);

    const isPasswordCorrect = await bcrypt.compare(passwordCurrent, oldUser.password)

    if (!isPasswordCorrect) {
        return next(new AppError("Current password is wrong", 400));
    }

    if (password !== confirmPassword) return next(new AppError("Passwords and confirm password are not the same", 400));

    const hashedPassword = await bcrypt.hash(password, 12);

    oldUser.password = hashedPassword;
    oldUser.save();

    const token = signToken(req.userId);

    res.status(200).json({ userData: oldUser, token });

})

export const forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("There is no user with email address", 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    let resetURL;
    if (process.env.NODE_ENV !== 'production')
        resetURL = `http://localhost:3000/user/resetPassword/${resetToken}`;
    else
        resetURL = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`;

    try {
        await new Email(user, resetURL).sendPasswordReset();

        // await sendEmail({
        //     email: user.email,
        //     subject: 'Your password reset token (valid for 10 min',
        //     message
        // });

        res.status(200).json({
            status: 'success',
            message: 'Token send to email'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending the email. Try again later!', 500)
        );
    }
})

export const resetPassword = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new AppError('password and confirm password are not the same', 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    user.save();

    const token = signToken(req.userId);

    res.status(200).json({ token });
});