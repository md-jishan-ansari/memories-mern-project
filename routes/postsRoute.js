import express from 'express';

const router = express.Router();

import { createPost, getPosts, getPost, getPostBySearch, deletePost, updatePost, likePost, addComment } from '../controllers/postsController.js';
import auth from '../controllers/middleware.js';

router
    .route('/')
    .get(getPosts)
    .post(auth, createPost)
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
    .patch(updatePost);

router
    .route('/:id/comment')
    .patch(addComment);

export default router;