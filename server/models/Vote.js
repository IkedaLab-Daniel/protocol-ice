const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['positive', 'negative']
    },
    label: {
        type: String,
        trim: true,
        maxlength: 200
    },
    score: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;