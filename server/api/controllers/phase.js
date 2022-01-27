const Phase = require('../models/phase')

exports.phases_create_phase = (req, res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        }) 
    }
    const phase = new Phase({
        namephase: req.body.namephase,
        numberphase: req.body.numberphase,
        method_id: req.body.method_id
    })
    Phase.create(phase, (err, data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new Phase'
            })
        } else res.send(data)
    })
}