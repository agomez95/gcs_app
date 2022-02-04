const Deliverable = require('../models/deliverable')

exports.deliverables_create_deliverable = (req, res) => {
    if(!req.body){
        return res.status(404).json({
            message: 'Data can not be empty!'
        }) 
    }
    const deliverable = new Deliverable({
        deliverablename: req.body.deliverablename,
        phase_id: req.body.phase_id
    })
    Deliverable.create(deliverable, (err, data) => {
        if(err){
            return res.status(500).json({
                message: 'Something is wrong while creating a new Phase'
            })
        } else res.send(data)
    })
}

exports.deliverables_findDeliverablesByPhases_deliverable = (req, res) => {
    Deliverable.findByPhase(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                return res.status(404).json({
                    message: `Not found any Deliverable from any Phase with this Id: ${req.params.id}, maybe not exist or the response doesn't have rows to show`
                })
            } else {
                return res.status(500).json({
                    message: 'Something is wrong while searching the Deliverables of this PhaseId: ' + req.params.id
                })
            }
        } else res.send(data)
    })
}
