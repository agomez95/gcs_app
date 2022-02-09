const Method_Project = require('../models/method_project')

exports.methods_projects_create_methodproject = (req,res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        })
    }
    const method_project = new Method_Project({
        project_id: req.body.project_id,
        method_id: req.body.method_id
    })    
    if(req.body.status) method_project.status = req.body.status

    Method_Project.create(method_project, (err,data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new Method for the Project'
            })
        } else res.send(data)   
    })
}

exports.methods_projects_findByUser_methodproject = (req,res) => {
    Method_Project.findByProjectManagment(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Project with this User id: ${req.params.id}, maybe no exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Project with this UserID: ' + req.params.id
                })
            }
        } else res.send(data)
    })
}

exports.methods_projects_activeProject_methodproject = (req, res) => {
    Method_Project.activeProject(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Project with this id: ${req.params.id}, maybe no exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Project with this Id: ' + req.params.id
                })
            }
        } else res.send(data) 
    })
}

exports.methods_projects_inactiveProject_methodproject = (req, res) => {
    Method_Project.inactiveProject(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Project with this id: ${req.params.id}, maybe no exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Project with this Id: ' + req.params.id
                })
            }
        } else res.send(data) 
    })
}