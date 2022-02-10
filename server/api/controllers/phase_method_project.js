const Phase_Method_Project = require('../models/phase_method_project')

exports.phases_methods_projects_create_phaseproject = (req,res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        })
    }
    const phase_method_project = new Phase_Method_Project({
        phase_id: req.body.phase_id,
        methodproject_id: req.body.methodproject_id,
    })
    
    if(req.body.status) phase_method_project.status = req.body.status

    Phase_Method_Project.create(phase_method_project, (err, data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while adding a new Phase for the Project'
            })
        } else res.send(data) 
    })
}

exports.phases_methods_projects_findByProject_phaseproject = (req,res) => {
    Phase_Method_Project.findByProject(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Phases of the Project with this id: ${req.params.id}, maybe no exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Phases with this ProjectId: ' + req.params.id
                })
            }
        } else res.send(data)
    })
}

exports.phases_methods_projects_updateActive_phase = (req, res) => {
    Phase_Method_Project.activePhase(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Phases of the Project with this id: ${req.params.id}, maybe no exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Phases with this ProjectId: ' + req.params.id
                })
            }
        } else res.send(data)
    })
}

exports.phases_methods_projects_updateInactive_phase = (req, res) => {
    Phase_Method_Project.inactivePhase(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Phases of the Project with this id: ${req.params.id}, maybe no exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Phases with this ProjectId: ' + req.params.id
                })
            }
        } else res.send(data)
    })
}