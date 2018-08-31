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
//test at postman at: http://localhost:9000/api/projects/
// {
// 	"name": "new project 1",
// 	"description": "new project 1 description"
// }

server.post('/api/projects', (req,res) => {
    const {name, description} = req.body;
    if(!name || !description) {
        res.status(400).json({message: 'Must provide a name and description'})
        return;
    }
    projects
        .insert({
            name,
            description
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({message: 'Error posting new project'});
            return;
        });
});


//DELETE request for project
server.delete('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    projects
        .remove(id)
        .then(removeProject => {
            if(removeProject === 0) {
                res.status(404).json({message: 'No project corresponding to that identifier'});
                return;
            }else{
            res.json({success: 'Project Successfully Removed'});
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error accessing project information'});
        return;
    });
});

//PUT request for project

server.put('/api/projects/:id', (req,res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    if(!name || !description) {
        res.status(400).json({message: 'Must provide a name and description'});
        return;
    }
    projects
        .update(id, {name, description})
        .then(response => {
            if (response == 0) {
                res.status(404).json({message: 'There is no project with that identifier'});
                return;
            }else{
                res.status(200).json({message: 'Project successfully updated'})
            }
        projects
            .get(id)
            .then(project => {
                if (project.length === 0){
                res.status(404).json({message: 'Unable to find specified project'});
                return;
            }
            res.json(project);
            })   
        .catch(error => {
            res.status(500).json({message: 'Error looking up project'});
        }); 
    })
    .catch(error => {
        res.status(500).json({message: 'Problem encountered in database'});
        return;
    });     
});



//*************ACTIONs***************
//http://localhost:9000/api/actions/

//example of data structure
// {
//     "id": 1,
//     "project_id": 1,
//     "description": "Fork and Clone Repository",
//     "notes": "Repo URL: https://github.com/LambdaSchool/Sprint-Challenge-Node-Express",
//     "completed": false
// },

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


//POST request for action -- needs to specify a project id
server.post('/api/actions', (req,res) => {
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes) {
        res.status(400).json({message: 'Must provide a project id, description and notes'})
        return;
    }
    actions
        .insert({
            project_id,
            description,
            notes
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({message: 'Error posting new action item'});
            return;
        });
});


//DELETE request for action

server.delete('/api/actions/:id', (req, res) => {
    const id = req.params.id;
    actions
        .remove(id)
        .then(removeAction => {
            if(removeAction === 0) {
                res.status(404).json({message: 'No action item corresponding to that identifier'});
                return;
            }else{
            res.json({success: 'Action item Successfully Removed'});
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error accessing action item'});
        return;
    });
});

//PUT request for action
server.put('/api/actions/:id', (req,res) => {
    const id = req.params.id;
    const { description, notes } = req.body;
    if(!description || !notes) {
        res.status(400).json({message: 'Must provide a description and notes'});
        return;
    }
    actions
        .update(id, {description, notes})
        .then(response => {
            if (response == 0) {
                res.status(404).json({message: 'There is no action item with that identifier'});
                return;
            }else{
                res.status(200).json({message: 'Action item successfully updated'})
            }
        actions
            .get(id)
            .then(action => {
                if (action.length === 0){
                res.status(404).json({message: 'Unable to find specified action item'});
                return;
            }
            res.json(action);
            })   
        .catch(error => {
            res.status(500).json({message: 'Error looking up action item'});
        }); 
    })
    .catch(error => {
        res.status(500).json({message: 'Problem encountered in database'});
        return;
    });     
});

//GET a list of actions for a specified project ID
server.get('/api/projects/actions/:project_id', (req,res)=> {
    const project_id = req.params.project_id;
    projects
        .getProjectActions(project_id) //function defined in 'userDb.js'
        .then(projectActions => {
            if (projectActions===0){
                res.status(404).json({message: 'Unable to find specified project'});
                return;
            }
            res.json(projectActions);
        })
        .catch(error => {
            res.status(500).json({message: 'problem encountered in database'});
            return;
    });
});
