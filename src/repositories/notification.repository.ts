import { Op } from "sequelize";
import Notification from "../models/notification.model";

class NotificationRepository {
  async getNewNotifications(userId: number) {
    const notifications = await Notification.findAll({where: { userId, read: false }, order: [["id", "DESC"]]});
    const notificationsRead = await Notification.findAll({where: { userId, read: true }, limit: 5, order: [["id", "DESC"]]});
    return [...notifications, ...notificationsRead];
  };

  async save(notification: any) {
    const noti = await Notification.create({...notification});
    return noti;
  };

  async markRead(notificationsIds: Array<number>) {
    const affectedRows = await Notification.update(
      { read: true },
      { where: { id: { [Op.in]: notificationsIds } } }
    );

    return affectedRows;
  };
}

export default new NotificationRepository()