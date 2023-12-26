import path from 'path';
import fs from 'fs';
import File from '../models/file.model';

class FileRepository {
  async save(file: any) {
    const result = await File.create({ ...file });
    return result;
  };

  async delete(file: any) {
    const result = await File.destroy({where: { id: file.id}});
    return result;
  };

  async moveLocationPost(pathFile: string, userId: number, postId: number) {
    try {
      const filePath = path.join(__dirname, '../../../storage-public/users/' + userId + '/posts/' + pathFile);
      const newPath = path.join(__dirname, '../../../storage-public/users/' + userId + '/posts/' + postId);

      if (fs.existsSync(filePath)) {
        if (!fs.existsSync(newPath)) {
          fs.mkdirSync(newPath, { recursive: true });
        }

        fs.copyFile(filePath, newPath + '/' + pathFile, (err) => {
          if (err) throw err;
          fs.unlinkSync(filePath);
        });
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default new FileRepository()