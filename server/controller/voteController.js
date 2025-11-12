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

// @desc    Get all votes with optional date filtering
// @route   GET /api/votes
// @access  Public
const getVotes = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let query = {};
        
        // Filter by date range if provided
        if (startDate || endDate) {
            query.timestamp = {};
            if (startDate) query.timestamp.$gte = new Date(startDate);
            if (endDate) query.timestamp.$lte = new Date(endDate);
        }

        const votes = await Vote.find(query).sort({ timestamp: -1 });

        res.json({
            success: true,
            count: votes.length,
            data: votes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
     createVote,
     getVotes
}