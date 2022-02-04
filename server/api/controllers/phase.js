const Phase = require('../models/phase')

exports.phases_create_phase = (req, res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        }) 
    }
    const phase = new Phase({
        phasename: req.body.phasename,
        phasenumber: req.body.phasenumber,
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

exports.phases_findPhasesByMethod_phase = (req, res) => {
    Phase.findByMethod(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found any Phase with this Method Id: ${req.params.id} maybe not exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Phases of this Method: ' + req.params.id
                })
            }
        } else res.send(data)
    })
}