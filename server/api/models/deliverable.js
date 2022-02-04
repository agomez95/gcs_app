const pool = require('../database/db')

const Deliverable = function(deliverable) {
    this.deliverablename = deliverable.deliverablename
    this.phase_id = deliverable.phase_id
}

Deliverable.create = async(newDeliverable, result) => {
    await pool.query('INSERT INTO deliverables SET?', newDeliverable, (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)  
        }
        console.log('A deliverable was created!')
        result(null, { id: res.insertId, ...newDeliverable })
    })
}
Deliverable.findByPhase = async(phaseId, result) => {
    await pool.query('SELECT d.id, d.deliverablename, p.phasename'+ 
                    ' FROM deliverables AS d INNER JOIN phases AS p ON p.id = d.phase_id'+ 
                    ' WHERE d.phase_id = ?', phaseId, (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        } 
        if(res.length){
            console.log(`That are the Deliverables of this Phase ${phaseId}`, res)            
            result(null, res)
            return
        }
        result({ kind: "not_found" }, null)   
    })
}
module.exports = Deliverable