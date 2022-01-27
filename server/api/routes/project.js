const express = require('express')
const router = express.Router()

const ProjectController = require('../controllers/project')

router.post("/", ProjectController.projects_create_project)

module.exports = router