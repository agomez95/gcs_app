const express = require('express')
const router = express.Router()

const MethodologyController = require('../controllers/methodology')

router.post('/', MethodologyController.methodologys_create_methodology)
router.get('/all', MethodologyController.methodologys_getAll_methodology)

module.exports = router
