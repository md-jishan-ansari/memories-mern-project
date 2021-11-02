import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please tell us your first name!'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Please tell us your second name!'],
            trim: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide your email address'],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 5
        },
        userImage: {
            type: String
        },
        cloudinary_id: {
            type: String
        },
        savedPosts: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'PostMessage',
            }
        ],
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,

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

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}


const User = mongoose.model('User', userSchema);

export default User;