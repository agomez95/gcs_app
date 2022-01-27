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
        state: req.body.state,
        level: req.body.level
    })
    User.create(user, (err, data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new User'
            })
        } else res.send(data)        
    })
}