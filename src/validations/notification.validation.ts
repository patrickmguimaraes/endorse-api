import Joi from 'joi';

export default class NotificationValidation {
  markRead = {
    body: Joi.object().keys({
      notificationsIds: Joi.array().required()
    }),
  }
}