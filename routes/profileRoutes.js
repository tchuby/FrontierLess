const express = require('express')
const router = express.Router()
const checkAuth = require('../helpers/auth').checkAuth

const ProfileController = require('../controllers/ProfileController')

router.get('/', checkAuth, ProfileController.showProfile)

router.post('/addProject', checkAuth, ProfileController.createProject)

module.exports = router