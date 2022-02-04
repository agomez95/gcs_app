const express = require('express')
const router = express.Router()

const PhaseController = require('../controllers/phase')

router.post('/', PhaseController.phases_create_phase)
router.get('/findbymethod/:id', PhaseController.phases_findPhasesByMethod_phase)

module.exports = router
