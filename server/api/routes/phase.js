const express = require('express')
const router = express.Router()

const PhaseController = require('../controllers/phase')

router.post('/', PhaseController.phases_create_phase)

module.exports = router
