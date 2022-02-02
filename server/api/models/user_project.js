const pool = require('../database/db')

const User_Project = function(user_project) {
    this.member_id = user_project.member_id
    this.project_id = user_project.project_id
    if(user_project.status) this.status = user_project.status
}

User_Project.create = async (newUserProject,result) => {
    await pool.query('INSERT INTO users_projects SET?', newUserProject, (err,res) => {
        if(err){
            
        }
        console.log('A new member was added to the project!')
        result(err, { id: res.insertId, ...newUserProject })
    })
}
User_Project.findByMember = async (memberId, result) => {
    await pool.query('SELECT p.id AS project_id, p.projectname, CONCAT(u.firstname, \' \', u.lastname) AS member'+ 
                    ' FROM users_projects AS up JOIN projects AS p ON p.id = up.project_id' +
                    ' JOIN users AS u ON u.id = up.member_id' + 
                    ' WHERE up.member_id = ?', memberId, (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.length){
            console.log('The member '+ memberId +' was found: ')            
            result(null, res)
            return
        }
        result({ kind: "not_found" }, null)
    })
}
User_Project.findByProject = async (projectId, result) => {
    await pool.query('SELECT p.id AS project_id, p.projectname, CONCAT(u.firstname, \' \', u.lastname) AS member,'+ 
                    ' (CASE WHEN up.status = 1 THEN \'Activo\' ELSE \'Inactivo\' END)  AS status_now' +
                    ' FROM users_projects AS up JOIN projects AS p ON p.id = up.project_id' +
                    ' JOIN users AS u ON u.id = up.member_id' + 
                    ' WHERE up.project_id = ?', projectId, (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.length){
            console.log('The Project: '+ projectId +' was found and have this members: ')            
            result(null, res)
            return
        }
        result({ kind: "not_found" }, null)
    })
}
User_Project.activeAllMemberByProject = async (projectId, result) => {
    await pool.query('SELECT p.id AS project_id, p.projectname, CONCAT(u.firstname, \' \', u.lastname) AS member,'+ 
                    ' (CASE WHEN up.status = 1 THEN \'Activo\' ELSE \'Inactivo\' END)  AS status_now' +
                    ' FROM users_projects AS up JOIN projects AS p ON p.id = up.project_id' +
                    ' JOIN users AS u ON u.id = up.member_id' + 
                    ' WHERE up.project_id = ? AND up.status = 1', projectId, (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.length){
            console.log('This members still active in the Project: ', res[0][1])            
            result(null, res)
            return
        }
        result({ kind: "not_found" }, null)
    })
}
User_Project.inactiveAllMemberByProject = async (projectId, result) => {
    await pool.query('SELECT p.id AS project_id, p.projectname, CONCAT(u.firstname, \' \', u.lastname) AS member,'+ 
                    ' (CASE WHEN up.status = 1 THEN \'Activo\' ELSE \'Inactivo\' END)  AS status_now' +
                    ' FROM users_projects AS up JOIN projects AS p ON p.id = up.project_id' +
                    ' JOIN users AS u ON u.id = up.member_id' + 
                    ' WHERE up.project_id = ? AND up.status = 0', projectId, (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.length){
            console.log('This members are inactive in the Project: ', res[0])            
            result(null, res)
            return
        } //this response find the project but don't retrieve rows cuz not exist members with inactive status but idk if is good to return not_found
        result({ kind: "not_found" }, null)
    })
}
module.exports = User_Project