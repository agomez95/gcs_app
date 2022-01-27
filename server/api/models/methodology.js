const pool = require('../database/db')

const Methodology = (methodology) => {
    this.methodname = methodology.methodname
    this.state = methodology.state
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

module.exports = Methodology