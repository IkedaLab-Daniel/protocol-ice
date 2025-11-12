const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.json({ message: "/api/vote/ working"})
        console.log("Working");
    })

module.exports = router;