import express from 'express';
import { addressValidation, tagValidation } from '../validations';
import { validate } from '../middlewares/validate';
import AddressController from '../controllers/address.controller';

class AddressRoute {
    router = express.Router();
    controller = new AddressController();

    constructor() {
        this.router.get('/getAllCountries', this.controller.getAllCountries);
        this.router.post('/getStates', validate(addressValidation.getStates), this.controller.getStates);
        this.router.post('/getCities', validate(addressValidation.getCities), this.controller.getCities);
        this.router.post('/getCity', validate(addressValidation.getCity), this.controller.getCity);
    }
}

export default new AddressRoute().router;