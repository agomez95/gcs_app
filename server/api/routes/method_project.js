const express = require('express')
const router = express.Router()

const MethodProjectController = require('../controllers/method_project')

router.post('/', MethodProjectController.methods_projects_create_methodproject)

router.get('/findbyuser/:id', MethodProjectController.methods_projects_findByUser_methodproject)

router.put('/activeproject/:id', MethodProjectController.methods_projects_activeProject_methodproject)
router.put('/inactiveproject/:id', MethodProjectController.methods_projects_inactiveProject_methodproject)

module.exports = router