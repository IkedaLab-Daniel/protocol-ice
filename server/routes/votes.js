const express = require('express');
const router = express.Router();

const {
    createVote,
    getVotes,
    getStats,
    deleteVote
} = require('../controllers/voteController');

router.route('/')
    .get(getVotes)
    .post(createVote);

router.route('/stats')
    .get(getStats);

router.route('/:id')
    .delete(deleteVote);

module.exports = router;