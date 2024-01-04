import { Request, Response } from "express";
import Company from "../models/company.model";
import companyRepository from "../repositories/company.repository";
import httpStatus from "http-status";

export default class CompanyController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const company: Company = req.body;
      
      const savedCompany = await companyRepository.save(company);

      res.status(201).send(savedCompany);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while saving company."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const companies = await companyRepository.retrieveAll({ title });

      res.status(200).send(companies);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving companies."
      });
    }
  }

  async findOneCompany(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const company = await companyRepository.retrieveById(id);

      if (company) res.status(200).send(company);
      else
        res.status(404).send({
          message: `Cannot find Company with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Company with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let company: Company = req.body;
    company.id = parseInt(req.params.id);

    try {
      const num = await companyRepository.update(company);

      if (num == 1) {
        res.send({
          message: "Company was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Company with id=${company.id}. Maybe Company was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Company with id=${company.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await companyRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Company was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Company with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await companyRepository.deleteAll();

      res.send({ message: `${num} companies were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all companies."
      });
    }
  }

  async findAllPublished(req: Request, res: Response) {
    try {
      const companies = await companyRepository.retrieveAll({ published: true });

      res.status(200).send(companies);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving companies."
      });
    }
  }

  async findByIndustry(req: Request, res: Response) {
    try {
      const categories = await companyRepository.findByIndustry({ industryId: req.params.industryId});

      res.status(200).send(categories);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while findByCategory."
      });
    }
  }

  async getAllIndustries(req: Request, res: Response) {
    try {
      const industries = await companyRepository.getAllIndustries();

      res.status(200).send(industries);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while getAllIndustries."
      });
    }
  }
  
  async getCompanies(req: Request, res: Response) {
    try {
      const companies = await companyRepository.getCompanies(req.body.name);
      res.status(httpStatus.OK).send(companies);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while getCompanies."
      });
    }
  }
}
