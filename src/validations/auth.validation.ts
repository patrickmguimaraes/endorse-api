import Joi from 'joi';
import { password } from './user.validation';

export default class AuthValidation {
  register = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      username: Joi.string(),
      type: Joi.string().required(),
      phone: Joi.string().allow(null).allow(""),
      streetLine1: Joi.string().allow(null).allow(""),
      streetLine2: Joi.string().allow(null).allow(""),
      country: Joi.string().allow(null).allow(""),
      state: Joi.string().allow(null).allow(""),
      city: Joi.string().allow(null).allow(""),
      postalCode: Joi.required().allow(null).allow(""),
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
      requests: Joi.array().allow(null),
      requestAssignments: Joi.array().allow(null),
      files: Joi.array().allow(null),
      requestHistory: Joi.array().allow(null),
      userAgreements: Joi.array().required(),
      isEmailVerified: Joi.boolean().required(),
      status: Joi.string().required(),
      views: Joi.array().allow(null),
      followers: Joi.array().allow(null),
      followeds: Joi.array().allow(null),
      posts: Joi.array().allow(null),
      settings: Joi.object().required()
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