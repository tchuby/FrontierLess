const express = require('express');
const router = express.Router();
const checkAuth = require('../helpers/auth').checkAuth;

const ProjectController = require('../controllers/ProjectController');

// Rotas
router.get('/:id', checkAuth, ProjectController.getProject); // Busca um projeto por ID
router.get('/projects', checkAuth, ProjectController.getAllProjects); // Busca projetos filtrando por parâmetros
router.post('/', checkAuth, ProjectController.createProject); // Cria um novo projeto
router.delete('/:id', checkAuth, ProjectController.removeProject); // Remove um projeto por ID
router.put('/:id', checkAuth, ProjectController.updateProject); // Atualiza um projeto por ID

module.exports = router;
