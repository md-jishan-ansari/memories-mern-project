import fs from 'fs';
import mongoose from 'mongoose';
import cloudinary from '../utils/cloudinary';
import path from 'path';

import User from '../models/user';
import PostMessage from '../models/post.js';

import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getPost = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new AppError('id is not valid', 400));

    const data = await PostMessage.findById(id);
    res.status(200).json({ data });

})

export const getPosts = catchAsync(async (req, res, next) => {
    const page = req.query.page || 1;

    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT)
    });

})

export const getPostBySearch = catchAsync(async (req, res, next) => {
    const search = req.query.search;
    let tags = req.query.tags.split(",");
    tags = tags.map(tag => new RegExp(tag, "i"));

    const title = new RegExp(search, "i");
    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags } }] });
    res.status(200).json({ data: posts });

})

export const createPost = catchAsync(async (req, res, next) => {

    let cloudinary_id = "", postImage = "";
    if (req.file) {
        cloudinary_id = req.result.public_id;
        postImage = req.result.secure_url;
    }
    else postImage = "Default-Image.jpg";

    const data = await PostMessage.create({ ...req.body, createdAt: new Date().toISOString(), cloudinary_id, postImage });
    res.status(201).json({
        status: 'success',
        data,
    })

})

export const deletePost = catchAsync(async (req, res, next) => {


    if (!mongoose.Types.ObjectId.isValid(req.body.id))
        return next(new AppError('id is not valid', 400));

    let post = await PostMessage.findById(req.body.id);

    if (post.cloudinary_id) {
        await cloudinary.uploader.destroy(post.cloudinary_id);
    }
    await post.remove();

    res.status(200).json({
        status: "success",
    })

})

export const updatePost = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new AppError('id is not valid', 400));

    const oldPost = await PostMessage.findById(id);

    if (req.file) {
        if (oldPost.cloudinary_id) {
            await cloudinary.uploader.destroy(oldPost.cloudinary_id);
        }
        req.body.cloudinary_id = req.result.public_id;
        req.body.postImage = req.result.secure_url;
    }

    const post = await PostMessage.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ post });

})

export const likePost = catchAsync(async (req, res, next) => {
    const { postId, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId))
        return next(new AppError('Post is not found', 400));

    const post = await PostMessage.findById(postId);
    const isUserLiked = post.likes.findIndex(id => id === String(userId));

    if (isUserLiked === -1) {
        // console.log("like");
        post?.likes?.push(String(userId));
    }
    else {
        // console.log('unLike');
        post.likes = post.likes.filter(id => id !== String(userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true });

    res.status(200).json({ post: updatedPost })

})

export const addComment = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const comment = req.body.comment;

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new AppError('Post is not found', 400));

    const post = await PostMessage.findOne({ _id: id });
    post.comments.push(comment);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json({ post: updatedPost });

})


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