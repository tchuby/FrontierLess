const express = require('express')
const router = express.Router()

const ReviewController = require('../controllers/ReviewController')

router.get('/:projectId', ReviewController.showCreate)
router.post('/', ReviewController.create)
router.get('/edit/:id', ReviewController.showEdit)
router.post('/edit', ReviewController.edit)
router.post('/remove', ReviewController.remove)

module.exports = router