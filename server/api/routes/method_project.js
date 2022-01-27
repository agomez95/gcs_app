const express = require('express')
const router = express.Router()

const MethodProjectController = require('../controllers/method_project')

router.post('/', MethodProjectController.methods_projects_create_methodproject)

module.exports = router