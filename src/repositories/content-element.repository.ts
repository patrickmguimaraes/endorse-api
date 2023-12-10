import ContentElement from "../models/content-element.model";

interface IContentElementRepository {
  save(contentElement: ContentElement): Promise<ContentElement>;
  update(contentElement: ContentElement): Promise<number>;
  delete(contentElementId: number): Promise<number>;
  getAll(): Promise<ContentElement[]>;
}

class ContentElementRepository implements IContentElementRepository {
  async save(contentElement: ContentElement): Promise<ContentElement> {
    try {
      return await ContentElement.create({...contentElement});
    } catch (err) {
      throw new Error("Failed to create ContentElement!");
    }
  }

  async update(contentElement: ContentElement): Promise<number> {
    try {
      const affectedRows = await ContentElement.update(
        { ...contentElement },
        { where: { id: contentElement.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update ContentElement!");
    }
  }

  async delete(contentElementId: number): Promise<number> {
    try {
      const affectedRows = await ContentElement.destroy({ where: { id: contentElementId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete ContentElement!");
    }
  }

  async getAll(): Promise<ContentElement[]> {
    try {
      const rows = await ContentElement.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new ContentElementRepository();
