const express = require('express')
const router = express.Router()

const UserProjectController = require('../controllers/user_project')

router.post("/", UserProjectController.users_projects_create_member)
router.get('/by-member/:id', UserProjectController.users_projects_findbymember)
router.get('/by-project/:id', UserProjectController.users_projects_findbyproject)
router.get('/allmembers_active/:id', UserProjectController.users_projects_findActiveMembersByProject)
router.get('/allmembers_inactive/:id', UserProjectController.users_projects_findInactiveMembersByProject)

module.exports = router