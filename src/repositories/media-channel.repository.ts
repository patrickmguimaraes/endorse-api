import MediaChannel from "../models/media-channel.model";

interface IMediaChannelRepository {
  save(mediaChannel: MediaChannel): Promise<MediaChannel>;
  update(mediaChannel: MediaChannel): Promise<number>;
  delete(mediaChannelId: number): Promise<number>;
  getAll(): Promise<MediaChannel[]>;
}

class MediaChannelRepository implements IMediaChannelRepository {
  async save(mediaChannel: MediaChannel): Promise<MediaChannel> {
    try {
      return await MediaChannel.create({...mediaChannel});
    } catch (err) {
      throw new Error("Failed to create MediaChannel!");
    }
  }

  async update(mediaChannel: MediaChannel): Promise<number> {
    try {
      const affectedRows = await MediaChannel.update(
        { ...mediaChannel },
        { where: { id: mediaChannel.id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update MediaChannel!");
    }
  }

  async delete(mediaChannelId: number): Promise<number> {
    try {
      const affectedRows = await MediaChannel.destroy({ where: { id: mediaChannelId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete MediaChannel!");
    }
  }

  async getAll(): Promise<MediaChannel[]> {
    try {
      const rows = await MediaChannel.findAll();

      return rows;
    } catch (error) {
      throw new Error("Failed to getAll!");
    }
  }
}

export default new MediaChannelRepository();
