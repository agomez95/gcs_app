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
