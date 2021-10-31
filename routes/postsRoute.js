import express from 'express';

const router = express.Router();

import { createPost, getPosts, getPost, getPostBySearch, deletePost, updatePost, likePost, addComment, getUserPosts, savePost, getSavedPosts } from '../controllers/postsController.js';
import auth, { uploadPostImage, uploadedPostCloudinary } from '../controllers/middleware.js';

router
    .route('/')
    .get(getPosts)
    .post(auth, uploadPostImage, uploadedPostCloudinary, createPost)
    .delete(deletePost);

router
    .route('/post')
    .patch(likePost);

router
    .route('/search')
    .get(getPostBySearch);

router
    .route('/:id')
    .get(getPost)
    .patch(auth, uploadPostImage, uploadedPostCloudinary, updatePost);

router
    .route('/:id/comment')
    .patch(addComment);

router.patch('/savePost/:id', savePost);

router.get('/userPosts/:id', getUserPosts);
router.get('/savedPosts/:id', getSavedPosts);

export default router;