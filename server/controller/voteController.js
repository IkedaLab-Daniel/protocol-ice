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
// @desc    Get vote statistics
// @route   GET /api/votes/stats
// @access  Public
const getStats = async (req, res) => {
    try {
        const { period = 'today'} = req.query;

        let startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        if (period === 'week') {
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === 'month') {
            startDate.setDate(startDate.getMonth() - 1);
        } else if (period === 'all') {
            startDate = new Date(0)
        }

        const votes = await Vote.find({
            timestamp: { $gte: startDate }
        });

        // calculate stats 
        const totalScore = votes.reduce((sum, vote) => sum + vote.score, 0);
        const positiveCount = votes.filter(v => v.type === 'positive').length;
        const negativeCount = votes.filter(v => v.type === 'negative').length;

        // get most common stats
        const labelCounts = {};
        votes.forEach(vote => {
            if (vote.label) {
                labelCounts[vote.label] = (labelCounts[vote.label] || 0) + 1
            }
        });

        // daily breakdown
        const dailystats = {};
        votes.forEach(vote => {
            const day = vote.timestamp.toISOString().split('T')[0];
            if (!dailystats[day]) {
                dailystats[day] = { positive: 0, negative: 0, total: 0 }
            }
            if (vote.type === 'positive') {
                dailystats[day].positive++;
            } else {
                dailystats[day].negative++;
            }
            dailystats[day].total += vote.score
        })

        const dailyBreakdown = Object.entries(dailystats).map(([date, stats]) => ({
            date,
            ...stats
        })).sort((a,b) => new Date(a.date) - new Date(b.date));

        res.json({
            success: true,
            data: {
                totalScore,
                positiveCount,
                negativeCount,
                labelCounts,
                totalVotes: votes.length,
                dailyBreakdown
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
     createVote,
     getVotes,
     getStats
}