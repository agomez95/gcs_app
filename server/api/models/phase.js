const pool = require('../database/db')

const Phase = (phase) => {
    this.namephase = phase.namephase
    this.numberphase = phase.numberphase
    this.method_id = phase.method_id
}

Phase.create = async (newPhase, result) => {
    await pool.query('INSERT INTO phases SET?', newPhase, (err, res) => {
        if(err) {
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        console.log('A phase was created!')
        result(null, { id: res.insertId, ...newPhase })
    })
}

module.exports = Phase