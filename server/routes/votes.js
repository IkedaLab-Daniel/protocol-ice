const express = require('express');
const router = express.Router();

const {
    createVote,
    getVotes,
    getStats
} = require('../controller/voteController');

router.route('/')
    .get(getVotes)
    .post(createVote);

router.route('/stats')
    .get(getStats)

module.exports = router;