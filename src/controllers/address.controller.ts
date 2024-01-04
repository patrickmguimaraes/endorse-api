import httpStatus from 'http-status';
import { catchAsync } from '../utils/catchAsync';
import addressRepository from '../repositories/address.repository';

export default class AddressController {
  getAllCountries = catchAsync(async (req: any, res: any) => {
    const countries = await addressRepository.getAllCountries();
    res.status(httpStatus.OK).send(countries);
  }); 

  getStates = catchAsync(async (req: any, res: any) => {
    const states = await addressRepository.getStates(req.body.countryId);
    res.status(httpStatus.OK).send(states);
  }); 

  getCities = catchAsync(async (req: any, res: any) => {
    const cities = await addressRepository.getCities(req.body.stateId);
    res.status(httpStatus.OK).send(cities);
  }); 

  getCity = catchAsync(async (req: any, res: any) => {
    const city = await addressRepository.getCity(req.body.cityId);
    res.status(httpStatus.OK).send(city);
  }); 
}