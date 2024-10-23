const express = require('express')
const router = express.Router()
const { checkAuth } = require('../helpers/auth')

const UserController = require('../controllers/UserController')

router.get('/:id', checkAuth, UserController.getUser)
router.post('/', UserController.createUser)
router.delete('/:id', checkAuth, UserController.removeUser)
router.put('/:id', checkAuth, UserController.updateUser)

module.exports = router