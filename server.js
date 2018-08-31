//*************IMPORTS****************/
const express = require('express');

//creates an express application using the express module
const server = express();

//connect to the database
const projects = require('./data/helpers/projectModel.js');

//allow parsing of data objects
server.use(express.json())

//*************ROUTES HERE***************

//Route to initiate server
server.get('/', (req,res) => {
    res.send('API up and running');
});

server.listen(9000, () => console.log('\n== API can be found at http://localhost:9000/ ==\n'))

//GET request
server.get('/api/projects', (req, res) => {
    projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        console.error('error',err);
        res.status(500).json({message: 'Error getting data'})
    });
});