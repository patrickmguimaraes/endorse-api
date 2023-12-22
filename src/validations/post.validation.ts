import Joi from 'joi';

export default class PostValidation {
  getPost = {
    body: Joi.object().keys({
      code: Joi.string().required(),
    }),
  }

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
    }),
  };

  viewed = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
    }),
  }

  power = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
    }),
  }

  unpower = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
    }),
  }

  endorse = {
    body: Joi.object().keys({
      text: Joi.string(),
      date: Joi.date().required(),
      status: Joi.string().required(),
      postId: Joi.number().required(),
      userId: Joi.number().required(),
      fatherId: Joi.number().allow(null),
      post: Joi.object(),
      user: Joi.object(),
      father: Joi.object(),
      children: Joi.array()
    }),
  }

  poweredAndEndorsed = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      postId: Joi.number().required(),
    }),
  }
}