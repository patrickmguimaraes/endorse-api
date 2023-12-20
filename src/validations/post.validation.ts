import Joi from 'joi';

export default class PostValidation {
  post = {
    body: Joi.object().keys({
      date: Joi.date().required(),
      powers: Joi.number().required(),
      endorsements: Joi.number().required(),
      user: Joi.object(),
      userId: Joi.number().required(),
      powersObject: Joi.array().allow(null),
      endorsementsObject: Joi.array().allow(null),
      link: Joi.string().allow(null),
      status: Joi.string().required(),
      views: Joi.array().allow(null),
      files: Joi.array().allow(null),
      article: Joi.object().allow(null),
      idea: Joi.object().allow(null),
    }),
  };

  newsFeed = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      page: Joi.number().required(),
      pageSize: Joi.number().required(),
    }),
  };
}