import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';

import PostMessage from '../models/post.js';

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

export const getUserPosts = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new Apperror("User id is not valid", 400));

    const posts = await PostMessage.find({ creater: id }).sort({ _id: -1 });
    res.status(200).json({ posts });

})

export const savePost = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = req.body.post;
    const postId = post._id;
    const oldUser = await User.findById(id);

    if (!oldUser) return next(new AppError("user not found", 400));

    if (oldUser.savedPosts.includes(postId)) oldUser.savedPosts.remove(postId);
    else oldUser.savedPosts.push(postId);

    oldUser.save();

    res.status(200).json({
        status: "success",
        savedPost: post
    });
});

export const getSavedPosts = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    let user = await User.findById(id);
    if (!user) return next(new AppError("user not found", 400));

    const savedIds = user.savedPosts;

    user = await User.findById(id).populate({
        path: 'savedPosts',
        select: '-__v'
    });

    res.status(200).json({
        status: "success",
        savedPosts: user.savedPosts,
        savedIds
    });
});