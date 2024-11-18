import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists with this email.');
        }
        const user = new User({ name, email, password, role });

        await user.save();

        res.status(201).send({ user });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);  
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, 'mysecretkey', { expiresIn: '3d' });

        res.send({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export default router;
