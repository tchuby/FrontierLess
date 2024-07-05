const express = require('express')
const router = express.Router()
const checkAuth = require('../helpers/auth').checkAuth

const SearchProjectsController = require('../controllers/SearchProjectsController')

router.get('/', checkAuth, SearchProjectsController.showSearchProjects)

//router.get('/:id', checkAuth, ProjectController.getOneProject)

module.exports = router