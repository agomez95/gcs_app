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

module.exports = Project