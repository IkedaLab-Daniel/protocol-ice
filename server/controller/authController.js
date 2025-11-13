const User = require('../models/User');
const jwt = require('jsonwebtoken');

// > Generate JWT TOken
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const usernameExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Username already taken'
            })
        }

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            })
        }

        // Create User
        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}