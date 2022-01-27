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
        state: req.body.state
    })
    Phase_Method_Project.create(phase_method_project, (err, res) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while adding a new Phase for the Project'
            })
        } else res.send(data) 
    })
}