import express from 'express';
import { validate } from '../middlewares/validate';
import { auth } from '../middlewares/auth';
import NotificationController from '../controllers/notification.controller';
import { notificationValidation } from '../validations';

class NotificationRoute {
    router = express.Router();
    notificationController = new NotificationController();

    constructor() {
        this.router.get('/getNewNotifications', auth('autoManagement'), this.notificationController.getNewNotifications);
        this.router.post('/markRead', auth('autoManagement'), validate(notificationValidation.markRead), this.notificationController.markRead);
    }
}

export default new NotificationRoute().router;