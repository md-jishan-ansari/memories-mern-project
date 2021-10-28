import mongoose from 'mongoose';

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