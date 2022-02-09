const pool = require('../database/db')

const User = function(user) {
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.email = user.email
    this.password = user.password
    if(user.status) this.status = user.status
    if(user.level) this.level = user.level
}

User.findById = async (userId, result) => {
    await pool.query('SELECT * FROM users WHERE id = ?', userId, (err,res) => {
        if(err){
            console.log('An error has ocurred: ', err)
            result(err, null)
            return
        }
        if(res.length){
            console.log('The user was found: ', res[0])            
            result(null, res[0])
            return
        }
        result({ kind: "not_found" }, null) //con kind mandaremos un estado en el caso no se encuentre el usuario en la bd al controlador
    })
}
User.create = async (newUser, result) => {
    await pool.query('INSERT INTO users SET?', newUser, (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        console.log('User was created!')
        result(null, { id: res.insertId, ...newUser })
    })
}
User.updateProfile = async (userId, user, result) => {
    await pool.query('UPDATE users SET firstname = ?, lastname = ? WHERE id = ?', [user.firstname, user.lastname, userId], (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The User was updated')
        result(null, { id: res.userId, firstname: user.firstname, lastname: user.lastname })
    })
}
User.updateEmail = async (userId, user, result) => {
    await pool.query('UPDATE users SET email = ? WHERE id = ?', [user.email, userId], (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The email of the User was updated')
        result(null, { id: res.userId, email: user.email })
    })
}
User.updatePassowrd = async (userId, user, result) => {
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [user.password, userId], (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The password of the User was updated')
        result(null, { id: res.userId })
    })
}
User.inactiveUser = async (userId, result) => {
    await pool.query('UPDATE users SET status = 0 WHERE id = ?', userId, (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The status of the User is inactive now: ')
        result(null, res[0])
    })
}
User.activeUser = async (userId, result) => {
    await pool.query('UPDATE users SET status = 1 WHERE id = ?', userId, (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The status of the User is active now: ')
        result(null, res[0])
    })
}
module.exports = User