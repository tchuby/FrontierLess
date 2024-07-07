const express = require('express')
const router = express.Router()
const checkAuth = require('../helpers/auth').checkAuth

const ProjectController = require('../controllers/ProjectController')

router.post('/add', checkAuth, ProjectController.createProject)
router.get('/add', checkAuth, ProjectController.showAddProject)
router.post('/remove', checkAuth, ProjectController.removeProject)
router.get('/update/:id', checkAuth, ProjectController.showUpdateProject)
router.post('/update', checkAuth, ProjectController.updateProject)
router.get('/:id', checkAuth, ProjectController.showProject)

//router.get('/:id', checkAuth, ProjectController.getOneProject)

module.exports = router