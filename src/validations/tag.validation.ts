import Joi from 'joi';

export default class TagValidation {
  findOrCreate = {
    body: Joi.object().keys({
      tag: Joi.string().required()
    }),
  }
}