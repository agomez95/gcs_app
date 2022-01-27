const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')

router.post("/", UserController.users_create_user)

module.exports = router