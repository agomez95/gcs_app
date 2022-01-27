const User_Project = require('../models/user_project')

exports.users_projects_create_member = (req, res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        })
    }
    const user_project = new User_Project({
        member_id: req.body.member_id,
        project_id: req.body.project_id,
        state: req.body.state
    })    
    User_Project.create(user_project, (err, data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new Member of Project'
            })
        } else res.send(data)        
    })
}
