const express = require('express');
const router = express.Router();
const db = require('../database/dbConfig.js');

// ========================== GET 

router.get('/', async (req, res) => {
    const allUsers = await db('users');
    try {
        res.status(200).json({allUsers})

    } catch {
        res.status(500).json({err, message: "unable to get posts"})
    }
});

module.exports = router;


