const express = require('express');
const router = express.Router();
const db = require('../database/dbConfig.js');


router.get('/', async (req, res) => {
    const allPosts = await db('posts');
    try {
        res.status(200).json({allPosts})

    } catch {
        res.status(500).json({err, message: "unable to get posts"})
    }
});


router.post('/', (req, res) => {
    newPost = req.body;
    db('posts').insert(newPost)
    .then((post) => {
        res.status(201).json({post, newPost})
    })
    .catch(() => {
        res.status(500).json({message: 'could not create post.'})
    })
});


module.exports = router;


// need to make titles unique.