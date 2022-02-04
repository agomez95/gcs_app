const pool = require('../database/db')

const Methodology = function(methodology) {
    this.methodname = methodology.methodname
    if(methodology.status) this.status = methodology.status
}

Methodology.create = async(newMethod, result) => {
    await pool.query('INSERT INTO methodologys SET?', newMethod, (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        console.log('Methodology was created!')
        result(null, { id: res.insertId, ...newMethod })
    })
}
Methodology.getAll = async(result) => {
    await pool.query('SELECT id, methodname FROM methodologys', (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.length){           
            result(null, res)
            return
        }
        result({ kind: "not_found" }, null)
    })
}
module.exports = Methodology