const pool = require('../database/db')

const Project = (project) => {
    this.projectname = project.projectname
    this.description = project.description
    this.projectmanagment_id = project.projectmanagment_id
}

Project.create = async (newProject, result) => {
    await pool.query('INSERT INTO projects SET?', newProject, (err, res) => {
        if(err) {
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        console.log('Project was created!')
        result(null, { id: res.insertId, ...newProject })
    })
}
Project.updateInformation = async (projectId, project, result) => {
    await pool.query('UPDATE projects SET description = ? WHERE id = ?', [project.description, projectId], (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The Project was updated')
        result(null, { id: res.projectId, description: project.description })
    })
}
Project.findByAuthor = async(userId, result) => {
    await pool.query
    ('SELECT p.id, p.projectname, p.created_at, u.id AS user_id, CONCAT(u.firstname, \',\', u.lastname) AS ProjectManagment FROM projects AS p'+ 
                    ' JOIN users AS u ON u.id = p.projectmanagment_id WHERE u.id = ?', userId, (err, res) => {
        if(err){
            console.log('An error has ocurred: ', err)
            result(err,null)
        }            
        if(res.length){
            console.log('The project of the user '+ userId +' was found: ')            
            result(null, res)
            return
        }
        result({ kind: "not_found" }, null)
    })
}
module.exports = Project