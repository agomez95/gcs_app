const Project = require('../models/project')

exports.projects_create_project = (req, res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        })
    }
    const project = new Project({
        projectname: req.body.projectname,
        description: req.body.description,
        projectmanagment_id: req.body.projectmanagment_id
    })    
    Project.create(project, (err, data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new Project'
            })
        } else res.send(data)        
    })
}

exports.projects_findByUser_project = (req,res) => {
    Project.findByAuthor(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Project not found with UserId ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Project whith this UserId: ' + req.params.id
                })
            }
        } else res.send(data)        
    })
}
