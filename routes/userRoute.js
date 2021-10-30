import express from 'express';

const router = express.Router();

import { login, signup, updateMe, updatePassword, forgotPassword, resetPassword } from '../controllers/userController';
import auth, { uploadUserPhoto, resizeUserPhoto } from '../controllers/middleware';

router.post('/login', login);
router.post('/signup', signup);

router.patch('/updateMe', auth, uploadUserPhoto, resizeUserPhoto, updateMe);
router.patch('/updatePassword', auth, updatePassword);

router.patch('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

export default router;