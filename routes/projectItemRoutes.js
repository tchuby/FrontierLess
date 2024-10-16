const express = require('express');
const router = express.Router();
const checkAuth = require('../helpers/auth').checkAuth;
const ProjectItemController = require('../controllers/ProjectItemController');


router.get('/project-item/:id', checkAuth, ProjectItemController.getProjectItem);
router.get('/project-items/:projectId', checkAuth, ProjectItemController.findAllByProject);
router.post('/', checkAuth, ProjectItemController.createProjectItem);
router.delete('/remove', checkAuth, ProjectItemController.removeProjectItem)
router.put('/edit', checkAuth, ProjectItemController.updateProjectItem)

module.exports = router;