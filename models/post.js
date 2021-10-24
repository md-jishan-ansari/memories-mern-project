import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    creater: String,
    createrName: String,
    title: String,
    message: String,
    tags: [String],
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;