const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check for token in auth header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // make sure token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token missing on header!"
        });
    }

    try {
        // verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // add user to "req"
        req.user = await User.findById(decoded.id)
        next();

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    protect
}