const express = require('express')
const router = express.Router()

const PhaseMethodProjectController = require('../controllers/phase_method_project')

router.post('/', PhaseMethodProjectController.phases_methods_projects_create_phaseproject)

module.exports = router