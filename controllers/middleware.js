import jwt from "jsonwebtoken";
import multer from 'multer';
import path from 'path';

import cloudinary from '../utils/cloudinary';

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

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
}

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: multerFilter,
});

export const uploadUserImage = upload.single('userImage');

export const uploadPostImage = upload.single('postImage');

export const uploadedUserCloudinary = catchAsync(async (req, res, next) => {
    if (!req.file) next();

    const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: 'memories_users',
        transformation: [
            { width: 500, height: 500, crop: "fill" },
            { quality: "auto" }
        ]
    });

    req.result = result;
    next();
});

export const uploadedPostCloudinary = catchAsync(async (req, res, next) => {
    if (!req.file) next();

    const result = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: 'memories_posts',
        transformation: [
            { width: 2000, height: 1333, crop: "fill" },
            { quality: "auto" }
        ]
    });

    req.result = result;
    next();
});

export default auth;

