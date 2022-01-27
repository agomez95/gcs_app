const Method_Project = require('../models/method_project')

exports.methods_projects_create_methodproject = (req,res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        })
    }
    const method_project = new Method_Project({
        project_id: req.body.project_id,
        method_id: req.body.method_id,
        state: req.body.state
    })
    Method_Project.create(method_project, (err,res) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new Method for the Project'
            })
        } else res.send(data)   
    })
}