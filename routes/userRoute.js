import express from 'express';

const router = express.Router();

import { login, signup, updateMe, updatePassword } from '../controllers/userController';
import auth, { uploadUserPhoto, resizeUserPhoto } from '../controllers/middleware';

router.post('/login', login);
router.post('/signup', signup);

router.patch('/updateMe', auth, uploadUserPhoto, resizeUserPhoto, updateMe);
router.patch('/updatePassword', auth, updatePassword);

export default router;