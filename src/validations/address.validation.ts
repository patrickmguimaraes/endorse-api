import Joi from 'joi';

export default class AddressValidation {
  getStates = {
    body: Joi.object().keys({
      countryId: Joi.number().required()
    }),
  }

  getCities = {
    body: Joi.object().keys({
      stateId: Joi.number().required()
    }),
  }

  getCity = {
    body: Joi.object().keys({
      cityId: Joi.number().required()
    }),
  }
}