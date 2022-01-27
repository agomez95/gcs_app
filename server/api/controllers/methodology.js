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