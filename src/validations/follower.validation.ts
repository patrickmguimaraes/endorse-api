import Joi from 'joi';

export default class FollowerValidation {
  follow = {
    body: Joi.object().keys({
      followerId: Joi.number().required(),
      follower: Joi.object(),
      followedId: Joi.number().required(),
      followed: Joi.object()
    }),
  };

  unfollow = {
    body: Joi.object().keys({
      followerId: Joi.number().required(),
      follower: Joi.object(),
      followedId: Joi.number().required(),
      followed: Joi.object()
    }),
  };

  suggests = {
    body: Joi.object().keys({
      userId: Joi.number().required(),
      limit: Joi.number().required()
    }),
  };

  isFollowing = {
    body: Joi.object().keys({
      followerId: Joi.number().required(),
      followedId: Joi.number().required()
    }),
  };

  followingNumber = {
    body: Joi.object().keys({
      followerId: Joi.number().required(),
      followedId: Joi.number().required()
    }),
  };
}