const pool = require('../database/db')

const Method_Project = function(method_project) {
    this.project_id = method_project.project_id
    this.method_id = method_project.method_id 
    if(method_project.status) this.status = method_project.status
}

Method_Project.create = async (newMethodProject, result) => {
    await pool.query('INSERT INTO methodologys_projects SET?', newMethodProject, (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            return(err, null)
        }
        console.log('A new method was added to the project!')
        result(err, { id: res.insertId, ...newMethodProject })
    })
}
Method_Project.findByProjectManagment = async (userId, result) => {
    await pool.query('SELECT p.projectname, CONCAT(u.firstname, \' \', u.lastname) AS projectmanagment,' + 
                    ' m.methodname AS methodname,(CASE WHEN mp.status = 1 THEN \'Abierto\' ELSE \'Cerrado\' END) AS status_now'+
                    ' FROM methodologys_projects AS mp'+
                    ' INNER JOIN projects AS p ON p.id = mp.project_id'+ 
                    ' INNER JOIN methodologys AS m ON m.id = mp.method_id'+
                    ' INNER JOIN users AS u ON u.id = p.projectmanagment_id'+
                    ' WHERE u.id = 2', userId, (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.length){
            console.log(`This is the Project of the User ${userId}: `, res[0][1])            
            result(null, res)
            return
        }
        result({ kind: "not_found" }, null)
    })
}
Method_Project.activeProject = async(methodProjectId, result) => {
    await pool.query('UPDATE methodologys_projects SET status = 1 WHERE id = ?', [methodProjectId], (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The Project is Open now', { id: res.methodProjectId, status: res.status })
        result(null, { id: res })
    })
}
Method_Project.inactiveProject = async(methodProjectId, result) => {
    await pool.query('UPDATE methodologys_projects SET status = 0 WHERE id = ?', [methodProjectId], (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The Project is Closed now')
        result(null, { id: res.methodProjectId, status: res.status })
    })
}
module.exports = Method_Project