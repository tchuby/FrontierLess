const express = require('express');
const router = express.Router();
const checkAuth = require('../helpers/auth').checkAuth;

const NotificationController = require('../controllers/NotificationController');

router.get('/notifications', checkAuth, NotificationController.getUserNotifications);
router.patch('/notifications/:notificationId/read', checkAuth, NotificationController.markAsRead);

module.exports = router;