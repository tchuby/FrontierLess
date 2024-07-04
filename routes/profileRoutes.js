const express = require('express')
const router = express.Router()

const ProfileController = require('../controllers/ProfileController')

router.get('/', ProfileController.showProfile)

module.exports = router