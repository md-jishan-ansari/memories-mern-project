import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const __dirname = path.resolve();

import postRouter from './routes/postsRoute.js';
import userRouter from './routes/userRoute.js';

process.on('uncaughtException', (error) => {
    console.log('UNCAUGHT EXCEPTIONS 🌟 shutting down');
    console.log(error.name, error.message);
    process.exit(1);
})

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connection successfully!"))
    .catch((error) => console.log(error));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("app is successfully deployed");
});


app.use('/posts', postRouter);
app.use('/user', userRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

process.on('unhandledRejection', (error) => {
    console.log("UNHANDLED REJECTION 🌟 shutting down server");
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    })
})