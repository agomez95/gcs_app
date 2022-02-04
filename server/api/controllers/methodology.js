const Methodology = require('../models/methodology')

exports.methodologys_create_methodology = (req,res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        })
    }
    const methodology = new Methodology({
        methodname: req.body.methodname,
        state: req.body.state
    })
    Methodology.create(methodology, (err, data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new Phase'
            })
        } else res.send(data)
    })
}

exports.methodologys_getAll_methodology = (req,res) => {
    Methodology.getAll((err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `No Methodologys founded`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Methodologys'
                })
            }
        } else res.send(data) 
    })
}