import Joi from 'joi';

export default class PostValidation {
  post = {
    body: Joi.object().keys({
      date: Joi.date().required(),
      text: Joi.string(),
      image: Joi.string(),
      video: Joi.string(),
      title: Joi.string(),
      author: Joi.string(),
      subject: Joi.string(),
      isArticle: Joi.boolean().required(),
      likes: Joi.number().required(),
      comments: Joi.number().required(),
      endorsements: Joi.number().required(),
      user: Joi.object(),
      userId: Joi.number().required(),
      likesObject: Joi.array().allow(null),
      commentsObject: Joi.array().allow(null),
      endorsementsObject: Joi.array().allow(null),
      link: Joi.string().allow(null),
      status: Joi.string().required(),
      views: Joi.array().allow(null),
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