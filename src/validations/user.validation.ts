import Joi from "joi";

export const objectId = (value: any, helpers: any) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

export const password = (value: any, helpers: any) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

export default class UserValidation {
  
  search = {
    body: Joi.object().keys({
      searchText: Joi.string().required(),
    }),
  };

  findByUsername = {
    body: Joi.object().keys({
      username: Joi.string().required(),
    }),
  };
}