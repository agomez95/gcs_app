const express = require('express')
const router = express.Router()

const UserProjectController = require('../controllers/user_project')

router.post("/", UserProjectController.users_projects_create_member)

module.exports = router