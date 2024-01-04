import City from '../models/city.model';
import Country from '../models/country.model';
import State from '../models/state.model';
import Tag from '../models/tag.model';

class AddressRepository {
  async getAllCountries() {
    const countries = await Country.findAll({order: [["name", "ASC"]]});

    return countries;
  };

  async getStates(countryId: number) {
    const states = await State.findAll({where: { countryId }, order: [["name", "ASC"]]});

    return states;
  };

  async getCities(stateId: number) {
    const cities = await City.findAll({where: { stateId }, order: [["name", "ASC"]]});

    return cities;
  };

  async getCity(cityId: number) {
    const city = await City.findOne({where: { id: cityId }, include: [ {model: State, include: [ { model: Country }]}]});
    return city;
  };
}

export default new AddressRepository()