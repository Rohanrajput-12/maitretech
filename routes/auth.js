const express = require('express')
const router = express.Router()

const userController = require('../controlllers/userController')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.put('/updatePassword',userController.updatePassword)

module.exports = router;