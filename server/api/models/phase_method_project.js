const pool = require('../database/db')

const Phase_Method_Project = (phase_method_project) => {
    this.phase_id = phase_method_project.phase_id
    this.methodproject_id = phase_method_project.methodproject_id
    this.state = phase_method_project.state
}

Phase_Method_Project.create = async (newPhaseMethodProject, result) => {
    await pool.query('INSERT INTO phases_methods_projects SET?', newPhaseMethodProject, (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            return(err, null)
        }
        console.log('A new phase was added to the project!')
        result(err, { id: res.insertId, ...newPhaseMethodProject })
    })
}

module.exports = Phase_Method_Project