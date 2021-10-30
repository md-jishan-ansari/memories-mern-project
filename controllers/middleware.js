import jwt from "jsonwebtoken";
import multer from 'multer';
import sharp from 'sharp';

import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            // console.log("you are not logged in! Please login to get access.");
            return res.status(400).json({ message: "You are not logged in Please login to get access." });
        }
        // console.log(token);
        const isCustomAuth = token?.length < 500;

        let decodedData, userId;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);

            userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            userId = decodedData?.sub;
        }

        req.userId = userId;

        next();
    } catch (error) {
        console.log("auth error:-", error);
    }
};


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single('userImage');

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.userId}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);

    next();
})

export const uploadPostImage = upload.single('postImage');

export const resizePostImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `post-${req.userId}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/memories/${req.file.filename}`);

    next();
})



export default auth;

