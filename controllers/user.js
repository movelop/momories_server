import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Users from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await Users.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(401).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req, res) => {
    const { email, password, firstname, lastname, confirmPassword } = req.body;

    try {
        const existingUser = await Users.findOne({ email });

        if(existingUser) return res.status(400).json({ message: 'User already exists' });

        if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

        const hashedPassword = await bycrypt.hash(password, 12);

        const result = await Users.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }       
}