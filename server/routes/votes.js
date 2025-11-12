const express = require('express');
const router = express.Router();

const {
    createVote,
    getVotes
} = require('../controller/voteController');

router.route('/')
    .get(getVotes)
    .post(createVote);

module.exports = router;