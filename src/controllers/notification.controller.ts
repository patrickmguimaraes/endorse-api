import httpStatus from 'http-status';
import { catchAsync } from '../utils/catchAsync';
import notificationRepository from '../repositories/notification.repository';

export default class NotificationController {
  getNewNotifications = catchAsync(async (req: any, res: any) => {
    const all = await notificationRepository.getNewNotifications(req.user.id);
    res.status(httpStatus.OK).send(all);
  });

  markRead = catchAsync(async (req: any, res: any) => {
    const affectedRows = await notificationRepository.markRead(req.body.notificationsIds);
    res.status(httpStatus.OK).send(affectedRows);
  });
}