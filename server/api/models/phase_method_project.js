const pool = require('../database/db')

const Phase_Method_Project = function(phase_method_project) {
    this.phase_id = phase_method_project.phase_id
    this.methodproject_id = phase_method_project.methodproject_id
    if(phase_method_project.status) this.status = phase_method_project.status
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
Phase_Method_Project.findByProject = async (userId, result) => {
    await pool.query('SELECT pr.projectname, p.phasename, p.phasenumber,' + 
                    ' m.methodname,(CASE WHEN pmp.status = 1 THEN \'Abierto\' ELSE \'Cerrado\' END) AS status_now'+
                    ' FROM phases_methods_projects AS pmp'+
                    ' INNER JOIN phases AS p ON p.id = pmp.phase_id'+ 
                    ' INNER JOIN methodologys_projects AS mp ON mp.id = pmp.methodproject_id'+
                    ' INNER JOIN projects AS pr ON pr.id = mp.project_id'+
                    ' INNER JOIN methodologys AS m ON m.id = mp.method_id'+
                    ' WHERE pr.id = ? GROUP BY p.phasenumber ASC', userId, (err,res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.length){
            console.log(`This Project ${userId} have the following phases: `, res[0][1])            
            result(null, res)
            return
        }
        result({ kind: "not_found" }, null)
    })
}
Phase_Method_Project.activePhase = async(phaseMethodProjectId, result) => {
    await pool.query('UPDATE phases_methods_projects SET status = 1 WHERE id = ?', [phaseMethodProjectId], (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The Project is Open now', { id: res.phaseMethodProjectId, status: res.status })
        result(null, { id: res })
    })
}
Phase_Method_Project.inactivePhase = async(phaseMethodProjectId, result) => {
    await pool.query('UPDATE phases_methods_projects SET status = 0 WHERE id = ?', [phaseMethodProjectId], (err, res) => {
        if(err){
            console.log('An error has occurred: ', err)
            result(err, null)
        }
        if(res.affectedRows == 0){
            result({ kind: 'not_found' }, null)
            return
        }
        console.log('The Project is Closed now')
        result(null, { id: res.phaseMethodProjectId, status: res.status })
    })
}
module.exports = Phase_Method_Project