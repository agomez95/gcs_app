const pool = require('../database/db')

const Method_Project = (method_project) => {
    this.project_id = method_project.project_id
    this.method_id = method_project.method_id 
    this.state = method_project.state
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

module.exports = Method_Project