const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds of 10
        
        // Create the user
        const user = await User.create({ username, password: hashedPassword, role });

        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = (req, res) => {
    res.json({ message: 'Logout successful' });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token, user role, and userId in the response
        res.json({ token, role: user.role, userId: user.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

   


};

module.exports = { register, login , logout};
