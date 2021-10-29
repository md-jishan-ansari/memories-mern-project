import fs from 'fs';
import mongoose from 'mongoose';

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
    const tags = req.query.tags.split(",");

    const title = new RegExp(search, "i");
    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags } }] });
    res.status(200).json({ data: posts });

})

export const createPost = catchAsync(async (req, res, next) => {

    if (req.file)
        req.body.postImage = req.file.filename;
    else req.body.postImage = "Default-Image.jpg";

    const data = await PostMessage.create({ ...req.body, createdAt: new Date().toISOString() });
    res.status(201).json({
        status: 'success',
        data,
    })

})

export const deletePost = catchAsync(async (req, res, next) => {


    if (!mongoose.Types.ObjectId.isValid(req.body.id))
        return next(new AppError('id is not valid', 400));

    await PostMessage.findByIdAndRemove(req.body.id);
    res.status(200).json({
        status: "success",
    })

})

export const updatePost = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new AppError('id is not valid', 400));

    if (req.file)
        req.body.postImage = req.file.filename;


    const oldPost = await PostMessage.findById(id);

    if (req.file && oldPost.postImage !== 'Default-Image.jpg')
        fs.unlink(`./public/img/memories/${oldPost.postImage}`, function (err) {
            if (err) console.log(err);
        })

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