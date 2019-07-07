const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

server.use(express.json());
server.use(helmet());
server.use(cors());
server.options('*', cors());

const posts = require('./posts-router.js');
const users = require('./users-router.js');
const auth = require('./auth-router.js');


// server.use('*', cors({
//    origin: ['http://localhost:3001'],
//    credentials: false,
// })); 

/* Routes */

server.use('/posts', posts);
server.use('/api/users', users);
server.use('/api/auth', auth);


server.get('/', (req, res) => {
    res.status(200).json({message: "API Running!"});
});


module.exports = server;

// try yarn init -y for package.json init
// npx knex migrate:make [table/migration name]