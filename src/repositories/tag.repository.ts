import Tag from '../models/tag.model';

class TagRepository {
  async findOrCreate(tag: string) {
    const [tagObject, created] = await Tag.findOrCreate({
      where: { name: tag.toLowerCase() }
    });

    return tagObject;
  };
}

export default new TagRepository()