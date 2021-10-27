import express from 'express';

const router = express.Router();

import { login, signup, getUserPosts } from '../controllers/userController';

router.post('/login', login);
router.post('/signup', signup);

router.get('/userPosts/:id', getUserPosts);

export default router;