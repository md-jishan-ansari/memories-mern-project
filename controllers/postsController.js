import mongoose from 'mongoose';

import PostMessage from '../models/post.js';

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(400).json({ message: "id is not valid" });

        const data = await PostMessage.findById(id);
        res.status(200).json({ data });

    } catch (error) {
        console.log(error);
    }
}

export const getPosts = async (req, res) => {
    const page = req.query.page || 1;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;

        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT)
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostBySearch = async (req, res) => {
    const search = req.query.search;
    const tags = req.query.tags.split(",");
    try {
        const title = new RegExp(search, "i");
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags } }] });
        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (req, res) => {
    try {
        const data = await PostMessage.create({ ...req.body, createdAt: new Date().toISOString() });
        res.status(201).json({
            status: 'success',
            data,
        })
    } catch (error) {
        console.log("createPost", error.message);
    }
}

export const deletePost = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.body.id))
            res.status(400).json({ message: "id is not valid" });

        await PostMessage.findByIdAndRemove(req.body.id);
        res.status(200).json({
            status: "success",
        })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(400).json({ message: "id is not valid" });

        const data = await PostMessage.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    const { postId, userId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) res.status(400).json({ message: "Post is not found" });

        const post = await PostMessage.findById(postId);
        const isUserLiked = post.likes.findIndex(id => id === String(userId));

        if (isUserLiked === -1) {
            console.log("like");
            post?.likes?.push(String(userId));
        }
        else {
            console.log('unLike');
            post.likes = post.likes.filter(id => id !== String(userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true });

        res.status(200).json({ post: updatedPost })
    } catch (error) {
        console.log(error);
    }
}

export const addComment = async (req, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) res.status(400).json({ message: "post is not found" });

        const post = await PostMessage.findOne({ _id: id });
        post.comments.push(comment);

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.status(200).json({ post: updatedPost });

    } catch (error) {
        console.log(error);
    }
}