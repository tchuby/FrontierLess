const express = require('express');
const router = express.Router();
const ProjectItemController = require('../controllers/ProjectItemController');

router.get('/:projectId', ProjectItemController.showCreate)
router.post('/', ProjectItemController.createProjectItem);
router.get('/edit/:id', ProjectItemController.showEdit)
router.post('/edit', ProjectItemController.edit)
router.post('/remove', ProjectItemController.remove)
router.get('/project-item/:id', ProjectItemController.findOne);
router.get('/project-items/:projectId', ProjectItemController.findAllByProject);

module.exports = router;