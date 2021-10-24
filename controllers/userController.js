import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

export const login = async (req, res) => {
    const { password, email } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (!oldUser) {
            return res.status(400).json({ message: 'email or password is wrong' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'email or password is wrong' });
        }

        const token = signToken(oldUser._id);

        res.status(200).json({
            userData: oldUser,
            token
        })

    } catch (error) {
        console.log(error);
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, name, email, password, confirmPassword } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User is already registered" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "password is not same" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            name,
            email,
            password: hashedPassword,
        });

        const token = signToken(user._id);

        res.status(200).json({ userData: user, token });
    } catch (error) {
        console.log(error);
    }
}