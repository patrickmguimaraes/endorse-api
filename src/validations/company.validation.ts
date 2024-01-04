import Joi from 'joi';

export default class CompanyValidation {
    getCompanies = {
        body: Joi.object().keys({
          name: Joi.string().required(),
        }),
      };
}