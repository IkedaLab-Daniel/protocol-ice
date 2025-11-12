const express = require('express');
const router = express.Router();

const {
    createVote
} = require('../controller/voteController');

router.route('/')
    .get((req, res) => {
        res.json({ message: "/api/vote/ working"})
        console.log("Working");
    })
    .post(createVote);

module.exports = router;