import { Op } from "sequelize";
import Category from "../models/category.model";

interface ICategoryRepository {
  save(category: Category): Promise<Category>;
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<Category[]>;
  retrieveById(categoryId: number): Promise<Category | null>;
  update(category: Category): Promise<number>;
  delete(categoryId: number): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class CategoryRepository implements ICategoryRepository {
  async save(category: Category): Promise<Category> {
    try {
      return await Category.create({...category});
    } catch (err) {
      throw new Error("Failed to create Category!");
    }
  }

  async retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Category[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.published) condition.published = true;

      if (searchParams?.title)
        condition.title = { [Op.like]: `%${searchParams.title}%` };

      return await Category.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Categorys!");
    }
  }

  async retrieveById(categoryId: number): Promise<Category | null> {
    try {
      return await Category.findByPk(categoryId);
    } catch (error) {
      throw new Error("Failed to retrieve Categorys!");
    }
  }

  async update(category: Category): Promise<number> {
    try {
      const affectedRows = await Category.update(
        { ...category },
        { where: { id: category.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Category!");
    }
  }

  async delete(categoryId: number): Promise<number> {
    try {
      const affectedRows = await Category.destroy({ where: { id: categoryId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Category!");
    }
  }
}

export default new CategoryRepository();
