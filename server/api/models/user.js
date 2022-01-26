const pool = require('../database/db')

const User = function(user) {
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.email = user.email
    this.password = user.password
    this.level = user.level
}

User.create = async (newUser, result) => {
    await pool.query('INSERT INTO users SET?', newUser, (err, res) => {
        if(err) {
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        console.log('User was created!')
        result(null, { id: res.insertId, ...newUser })
    })
}

module.exports = User