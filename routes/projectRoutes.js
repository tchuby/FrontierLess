const express = require('express')
const router = express.Router()
const checkAuth = require('../helpers/auth').checkAuth

const ProjectController = require('../controllers/ProjectController')

router.get('/', checkAuth, ProjectController.showProject)

module.exports = router