const pool = require('../database/db')

const Phase = function(phase) {
    this.phasename = phase.phasename
    this.phasenumber = phase.phasenumber
    this.method_id = phase.method_id
}

Phase.create = async (newPhase, result) => {
    await pool.query('INSERT INTO phases SET?', newPhase, (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        console.log('A phase was created!')
        result(null, { id: res.insertId, ...newPhase })
    })
}
Phase.findByMethod = async(methodId, result) => {
    await pool.query('SELECT p.id, p.phasename, p.phasenumber, m.methodname'+ 
                    ' FROM phases AS p INNER JOIN methodologys AS m ON m.id = p.method_id'+ 
                    ' WHERE p.method_id = ? ORDER BY p.phasenumber ASC', methodId, (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        } 
        if(res.length){
            console.log(`That are the Phases of this Method ${methodId}`, res)            
            result(null, res)
            return
        }
        result({ kind: "not_found" }, null)                   
    })
}
module.exports = Phase