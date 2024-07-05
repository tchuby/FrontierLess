const express = require('express');
const router = express.Router();
const ProjectItemController = require('../controllers/ProjectItemController');

router.post('/project-items', ProjectItemController.createProjectItem);
router.get('/project-items/:id', ProjectItemController.findOne);
router.get('/project-items/by-project/:projectId', ProjectItemController.findAllByProject);

module.exports = router;