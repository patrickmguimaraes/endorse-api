import Joi from 'joi';
import { password } from './user.validation';

export default class AuthValidation {
  register = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      username: Joi.string(),
      type: Joi.string().required(),
      phone: Joi.string().required(),
      streetLine1: Joi.string().required(),
      streetLine2: Joi.string(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      postalCode: Joi.required().required(),
      linkedin: Joi.string().allow(null),
      facebook: Joi.string().allow(null),
      instagram: Joi.string().allow(null),
      x: Joi.string().allow(null),
      role: Joi.string().required().valid('user', 'admin'),
      language: Joi.string().required(),
      location: Joi.string().required(),
      notification: Joi.string().allow(null),
      signupProvider: Joi.string().allow(null),
      date: Joi.date().allow(null),
      removed: Joi.date().allow(null),
      personId: Joi.number().allow(null),
      companyId: Joi.number().allow(null),
      person: Joi.object().allow(null),
      company: Joi.object().allow(null),
      endorses: Joi.array().allow(null),
      endorseAssignments: Joi.array().allow(null),
      files: Joi.array().allow(null),
      endorseHistory: Joi.array().allow(null),
      userTermsAndConditions: Joi.array().required(),
      isEmailVerified: Joi.boolean().required(),
      status: Joi.string().required(),
      views: Joi.array().allow(null),
      followers: Joi.array().allow(null),
      followeds: Joi.array().allow(null),
      posts: Joi.array().allow(null),
    }),
  };
  
  login = {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  };
  
  me = {
    body: Joi.object().keys({
      token: Joi.string().required(),
    }),
  };
  
  logout = {
    body: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  };
  
  refreshTokens = {
    body: Joi.object().keys({
      token: Joi.string().required(),
      refreshToken: Joi.string().required(),
    }),
  };
  
  forgotPassword = {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  };
  
  resetPassword = {
    query: Joi.object().keys({
      token: Joi.string().required(),
    }),
    body: Joi.object().keys({
      password: Joi.string().required().custom(password),
    }),
  };
  
  verifyEmail = {
    query: Joi.object().keys({
      token: Joi.string().required(),
    }),
  };
}