const express = require('express')
const router = express.Router()

const PhaseMethodProjectController = require('../controllers/phase_method_project')

router.post('/', PhaseMethodProjectController.phases_methods_projects_create_phaseproject)
router.get('/findProject/:id', PhaseMethodProjectController.phases_methods_projects_findByProject_phaseproject)

router.put('/activePhase/:id', PhaseMethodProjectController.phases_methods_projects_updateActive_phase)
router.put('/inactivePhase/:id', PhaseMethodProjectController.phases_methods_projects_updateInactive_phase)

module.exports = router