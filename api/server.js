const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const posts = require('./posts-router.js');

server.use(express.json());
server.use(helmet());
server.use(cors());

/* server.use('*', cors({
   origin: ['http://localhost:3000'],
   credentials: true,
})); */


/* Routes */

server.use('/posts', posts)

server.get('/', (req, res) => {
    res.status(200).json({message: "API Running!"});
});


module.exports = server;

// try yarn init -y for package.json init
// npx knex migrate:make [table/migration name]