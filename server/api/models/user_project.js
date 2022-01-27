const pool = require('../database/db')

const User_Project = (user_project) => {
    this.member_id = user_project.member_id
    this.project_id = user_project.project_id
    this.state = user_project.state
}

User_Project.create = async (newUserProject,result) => {
    await pool.query('INSERT INTO users_projects SET?', newUserProject, (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        console.log('A new member was added to the project!')
        result(err, { id: res.insertId, ...newUserProject })
    })
}

module.exports = User_Project