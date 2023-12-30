import { config } from "../config/db.config";
import Company from "../models/company.model";
import Country from "../models/country.model";
import Industry from "../models/industry.model";
import State from "../models/state.model";
import City from "../models/city.model";
import path from "path";
import fs from "fs";
import { Op, Sequelize, col } from "sequelize";

const sdk = require('api')('@peopledatalabs/v5.0#1g9k9252lmbejh2q');

sdk.auth(config.PEOPLE_DATA_LABS);

class PeopleDataLabs {
    constructor() {
        //this.addCountries();
        //this.updateCompanies()
    }

    async addCountries() {
        try {
            fs.readFile(path.join(__dirname, '../../../src/companyAPI/countries.json'), "utf8", (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                JSON.parse(jsonString).forEach(async (country: any) => {
                    var c: any = {};
                    c.id = country.id;
                    c.name = country.name;
                    c.iso = country.iso2;
                    c.iso3 = country.iso3;
                    c.numcode = country.numeric_code;
                    c.phonecode = country.phone_code;
                    c.capital = country.capital;
                    c.currency = country.currency;
                    c.currencyName = country.currency_name;
                    c.currencySymbol = country.currency_symbol;
                    c.region = country.region;
                    c.subRegion = country.subregion;
                    c.nativeName = country.native!;
                    c.tld = country.tld;
                    c.nationality = country.nationality;
                    c.emojiU = country.emojiU;

                    await Country.create(c)
                })

                this.addStates();

            });
        } catch (error: any) {
            console.log(error.message)
        }

    }

    async addStates() {
        try {
            fs.readFile(path.join(__dirname, '../../../src/companyAPI/states.json'), "utf8", (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                JSON.parse(jsonString).forEach(async (state: any) => {
                    var c: any = {};
                    c.id = state.id;
                    c.name = state.name;
                    c.stateCode = state.state_code;
                    c.countryId = state.country_id;

                    await State.create(c)
                })

                this.addCities();
            });
        } catch (error: any) {
            console.log(error.message)
        }

    }

    async addCities() {
        try {
            fs.readFile(path.join(__dirname, '../../../src/companyAPI/cities.json'), "utf8", (err, jsonString) => {
                if (err) {
                    console.log("File read failed:", err);
                    return;
                }
                JSON.parse(jsonString).forEach(async (city: any) => {
                    var c: any = {};
                    c.id = city.id;
                    c.name = city.name;
                    c.latitude = city.latitude;
                    c.longitude = city.longitude;
                    c.wikiDataId = city.wikiDataId;
                    c.stateId = city.state_id;

                    await City.create(c)
                })
                console.log("finished!")
            });
        } catch (error: any) {
            console.log(error.message)
        }

    }

    async updateCompanies() {
        // if ((await Industry.findAll()).length == 0) {
        //     console.log("-----------CREATING INDUSTRIES-------------");

        //     var industries = await Company.findAll({
        //         attributes: [
        //             [Sequelize.fn('DISTINCT', Sequelize.col('industry')), 'industry']
        //         ],
        //     });

        //     var industriesNames: Array<string> = industries.map((indu) => indu.industry!);

        //     industriesNames.forEach(async industry => {
        //         await Industry.create({ name: industry })
        //     });

        //     console.log("-----------CREATING INDUSTRIES FINISHED-------------")
        // }

        console.log("-----------GETTING ALL CITIES-------------")

        try {
            var cities = await City.findAll({
                attributes: ['id', "name"],
                where: { flag: false },
                include: [
                    { model: State, attributes: ["name"], include: [{ model: Country, attributes: ["name", "iso"] }] }
                ],
            });

            cities.forEach(async city => {
                console.log("-----------UPDATING FROM CITY " + city.name + "-------------")

                await Company.update({cityId: city.id}, {
                     where: {
                        [Op.or]: {
                            country_code: city.state?.country?.iso,
                            state: city.state?.name
                        },
                        city: city.name
                    } 
                });

                await City.update({flag: true}, { where: { id: city.id }});
                console.log("-----------FINISHED FROM CITY " + city.name + "-------------")
            })
            
        } catch (error: any) {
            console.log(error.message)
        }
    }
}

export default PeopleDataLabs;