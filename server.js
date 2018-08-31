//*************IMPORTS****************/
const express = require('express');

//creates an express application using the express module
const server = express();

//connect to the database
const projects = require('./data/helpers/projectModel.js');
const actions = require('./data/helpers/actionModel.js');
const mappers = require('./data/helpers/mappers.js');

//allow parsing of data objects
server.use(express.json())

//*************ROUTES HERE***************

//Route to initiate server
server.get('/', (req,res) => {
    res.send('API up and running');
});

server.listen(9000, () => console.log('\n== API can be found at http://localhost:9000/ ==\n'))

//*************PROJECTS***************
//Project fields: id, name (string), descriptiion (string), completed (T/F)

//GET request for all projects
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


//individual GET request for project
server.get('/api/projects/:id', (req,res) => {
    const id = req.params.id;
    projects
        .get(id)
        .then(project => {
            if(project.length === 0){
                res.status(404).json({message: 'No project corresponding to that identifier'});
                return;
            }
            res.json(project);
        })
        .catch(error => {
            res.status(500).json({message: 'Error looking for project'});
        });
});


//POST request for project

//DELETE request for project

//PUT request for project


//*************ACTIONs***************
//GET request for all actions
server.get('/api/actions', (req, res) => {
    actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        console.error('error',err);
        res.status(500).json({message: 'Error getting data'})
    });
});

//individual GET request for action
server.get('/api/actions/:id', (req,res) => {
    const id = req.params.id;
    actions
        .get(id)
        .then(action => {
            if(action.length === 0){
                res.status(404).json({message: 'No actions corresponding to that identifier'});
                return;
            }
            res.json(action);
        })
        .catch(error => {
            res.status(500).json({message: 'Error looking for action'});
        });
});


//POST request for action

//DELETE request for action

//PUT request for action
