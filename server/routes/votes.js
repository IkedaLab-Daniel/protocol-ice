const express = require('express');
const router = express.Router();

const {
    createVote,
    getVotes,
    getStats,
    deleteVote,
    getMyVotes,
} = require('../controllers/voteController');

const {
    protect,
    protectAdmin
} = require('../middlewares/auth');

router.route('/')
    .get(protectAdmin, getVotes)
    .post(protect, createVote);

router.route('/my-votes')
    .get(protect, getMyVotes)

router.route('/stats')
    .get(protect, getStats);

router.route('/:id')
    .delete(protect, deleteVote);

module.exports = router;