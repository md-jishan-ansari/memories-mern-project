import express from 'express';

const router = express.Router();

import { login, signup } from '../controllers/userController';

router.post('/login', login);
router.post('/signup', signup);

export default router;