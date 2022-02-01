const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')

router.post("/", UserController.users_create_user)
router.get('/:id', UserController.users_findOneUser_user)

router.put('/update/profile/:id', UserController.users_updateProfile_user)
router.put('/update/email/:id', UserController.users_updateEmail_user)
router.put('/update/password/:id', UserController.users_updatePassword_user)

router.put('/update/status1/:id', UserController.users_activeUser_user)
router.put('/update/status2/:id', UserController.users_inactiveUser_user)

module.exports = router