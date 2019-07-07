const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../database/dbConfig.js');
const authHelper = require('../database/auth-helpers.js');


router.post('/register', async (req, res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 11);
    creds.password = hash;

    try {
       let insertUser = await users.insert(creds);
       const token = authHelper.generateToken(creds);
       insertUser = await db('users').where({username: insertUser.username}).select("id", "username", "email", "firstName", "lastName");

       res.status(201).json({
          message: `Registration successful`,
          token,
          currentUser: insertUser,
       });

    } catch (err) {
       res.status(500).json({ message: `Unable to register` });
    }
 });

 router.post('/login', async (req, res) => {
    const creds = req.body;

    try {
       let user = await db('users')
          .where({ username: creds.username })
          .first();

       if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = authHelper.generateToken(user);

          user = await db('users')
          .where({ username: creds.username })
          .first().select("id", "username", "email", "firstName", "lastName");

          res.status(200).json({
             message: `Welcome back ${user.firstName} ${user.lastName}`,
             token,
             currentUser: user
          });
       } else {
          res.status(401).json({ message: `Unauthorized credentials` });
       }
    } catch (err) {
       res.status(500).json({ message: `Unable to login` });
    }
 });

 module.exports = router;

