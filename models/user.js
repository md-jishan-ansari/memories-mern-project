import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        userImage: {
            type: String,
            default: "user-default.png"
        },
        savedPosts: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'PostMessage',
            }
        ]

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

// userSchema.pre(/^findById/, function (next) {
//     this.populate({
//         path: 'savedPosts',
//         select: '-__v'
//     });

//     next();
// })

const User = mongoose.model('User', userSchema);

export default User;