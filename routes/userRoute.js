import express from 'express';

const router = express.Router();

import { login, signup, getUserPosts, savePost, getSavedPosts } from '../controllers/userController';

router.post('/login', login);
router.post('/signup', signup);

router.patch('/savePost/:id', savePost);

router.get('/userPosts/:id', getUserPosts);
router.get('/savedPosts/:id', getSavedPosts);

export default router;