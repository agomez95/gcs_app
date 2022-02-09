const User_Project = require('../models/user_project')

exports.users_projects_create_member = (req, res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        })
    }      
    const user_project = new User_Project({
        member_id: req.body.member_id,
        project_id: req.body.project_id
    })  
    if(req.body.status) user_project.status = req.body.status

    User_Project.create(user_project, (err, data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new Member of Project'
            })
        } else res.send(data)        
    })
}

exports.users_projects_findbymember = (req, res) => {
    User_Project.findByMember(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Member with this id: ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Member of the Project with this Id: ' + req.params.id
                })
            }
        } else res.send(data)        
    })
}

exports.users_projects_findbyproject = (req, res) => {
    User_Project.findByProject(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Project with this id: ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Members of the Project with this Id: ' + req.params.id
                })
            }
        } else res.send(data)        
    })
}

exports.users_projects_findActiveMembersByProject = (req, res) => {
    User_Project.activeAllMemberByProject(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Project with this id: ${req.params.id}, maybe no exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Members of the Project with this Id: ' + req.params.id
                })
            }
        } else res.send(data)
    })
}

exports.users_projects_findInactiveMembersByProject = (req, res) => {
    User_Project.inactiveAllMemberByProject(req.params.id, (err, data) => {
        if(err){
            /*if(err.kind === "without_rows"){
                return res.status(404).json({
                    message: `The Project exist but doesn't have Inactive Members`
                })
            } else */if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found the Project with this id: ${req.params.id}, maybe no exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Members of the Project with this Id: ' + req.params.id
                })
            } 
        } else res.send(data)
    })
}

exports.users_projects_activeMember_member = (req, res) => {
    User_Project.activeMember(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Member not found with this Id ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Member whith Id: ' + req.params.id
                })
            }
        } else res.send(data) 
    })
}

exports.users_projects_inactiveMember_member = (req, res) => {
    User_Project.inactiveMember(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Member not found with this Id ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Member whith Id: ' + req.params.id
                })
            }
        } else res.send(data) 
    })
}