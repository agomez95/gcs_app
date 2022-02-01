const User = require('../models/user')

exports.users_create_user = (req, res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        })
    }
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        level: req.body.level
    })    

    if(req.body.status) user.status = req.body.status
    if(req.body.level) user.level = req.body.level

    User.create(user, (err, data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new User'
            })
        } else res.send(data)        
    })
}

exports.users_findOneUser_user = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `User not found with id ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the User whith id: ' + req.params.id
                })
            }
        } else res.send(data)        
    })
}

exports.users_updateProfile_user = (req, res) => {
    User.updateProfile(req.params.id, new User(req.body), (err,data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `User not found with id ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the User whith id: ' + req.params.id
                })
            }
        } else res.send(data)    
    })
}

exports.users_updateEmail_user = (req, res) => {
    User.updateEmail(req.params.id, new User(req.body), (err,data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `User not found with id ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the User whith id: ' + req.params.id
                })
            }
        } else res.send(data) 
    })
}

exports.users_updatePassword_user = (req, res) => {
    User.updatePassowrd(req.params.id, new User(req.body), (err,data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `User not found with id ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the User whith id: ' + req.params.id
                })
            }
        } else res.send(data) 
    })
}

exports.users_activeUser_user = (req, res) => {
    User.activeUser(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `User not found with id ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the User whith id: ' + req.params.id
                })
            }
        } else res.send(data) 
    })
}

exports.users_inactiveUser_user = (req, res) => {
    User.inactiveUser(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `User not found with id ${req.params.id} or not exist.`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the User whith id: ' + req.params.id
                })
            }
        } else res.send(data) 
    })
}