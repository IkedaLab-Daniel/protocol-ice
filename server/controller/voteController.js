const Vote = require('../models/Vote');

// @desc    Create a new vote
// @route   POST /api/votes
// @access  Public
const createVote = async (req, res) => {
    try {
        const { type, label, score } = req.body;
        let finalScore = 0

        if (!type){
            return res.status(400).json({
                success: false,
                message: 'Type field is missing'
            });
        }

        if (type === 'positive'){
            finalScore = score
        } else if (type === 'negative') {
            finalScore = -score
        }

        const vote = await Vote.create({
            type,
            label: label || undefined,
            score: finalScore
        });

        res.status(201).json({
            success: true,
            data: vote
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createVote
}