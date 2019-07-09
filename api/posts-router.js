const express = require('express');
const router = express.Router();
const db = require('../database/dbConfig.js');
const authHelper = require('../database/auth-helpers.js');

router.get('/', async (req, res) => {
    const allPosts = await db('posts');
    try {
        res.status(200).json({allPosts})

    } catch {
        res.status(500).json({err, message: "unable to get posts"})
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await db('posts').where({id : id}).first() 

        !post
            ? res.status(404).json({ error: 'post does not exist' })
            : res.status(200).json(post);

    } catch {
        res.status(500).json({err, message: "unable to get post"})
    }
});


router.post('/', authHelper.protected, (req, res) => {
    newPost = req.body;
    db('posts').insert(newPost)
    .then((post) => {
        res.status(201).json({post, newPost})
    })
    .catch(() => {
        res.status(500).json({message: 'could not create post.'})
    })
});


router.delete('/:id', authHelper.protected, (req, res) => {
    const { id } = req.params;
    const post = db('posts').where({ id: id})

    !post
        ? res.status(400).json({error: "post does not exist"})
        : post.delete().then(() => {
            res.status(202).json({message: "post has been deleted"})
        })
        .catch(() => {
            res.status(500).json({message: 'could not delete post.'})
        })
});


router.put('/:id', authHelper.protected, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
       const post = await db('posts')
          .where({ id: id })
          .first();
 
       !post
          ? res.status(404).json({ error: 'post does not exist' })
          : await db('posts')
               .where({ id: id })
               .update(changes);
            const changedPost = await db('posts').where({id:id});
            const allPosts = await db('posts');
       res.status(202).json({
          message: `post with id:'${post.id}' has been updated`,
          allPosts,
          changedPost
       });
    } catch (err) {
       res.status(500).json({ err, error: 'unable to update the post' });
    }
 });

module.exports = router;
