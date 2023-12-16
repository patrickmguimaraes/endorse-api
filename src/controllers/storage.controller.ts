import fileUpload from 'express-fileupload';
import { catchAsync } from '../utils/catchAsync';
import path from "path";
import fs from "fs";
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

export default class StorageController {
  savePostImage = catchAsync(async (req: any, res: any) => {
    try {
      let sampleFile: fileUpload.UploadedFile;
      let uploadPath: string;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      if (!fs.existsSync(path.join(__dirname, '../../../storage-public/posts/'))) {
        fs.mkdirSync(path.join(__dirname, '../../../storage-public/posts/'), { recursive: true });
      }

      sampleFile = req.files.file as fileUpload.UploadedFile;
      const name: string = new Date().getTime() + ".png";
      uploadPath = path.join(__dirname, '../../../storage-public/posts/' + name);

      sampleFile.mv(uploadPath, function (err) {
        if (err) {
          throw new ApiError(httpStatus.EXPECTATION_FAILED, err.message);
        }
        
        res.send({path: name});
      });
    } catch (err: any) {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, err.message);
    }
  });

  savePostVideo = catchAsync(async (req: any, res: any) => {
    try {
      let sampleFile: fileUpload.UploadedFile;
      let uploadPath: string;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      if (!fs.existsSync(path.join(__dirname, '../../../storage-public/posts/'))) {
        fs.mkdirSync(path.join(__dirname, '../../../storage-public/posts/'), { recursive: true });
      }

      sampleFile = req.files.file as fileUpload.UploadedFile;
      var type = sampleFile.mimetype.substring(sampleFile.mimetype.search("/") + 1);
      const name: string = new Date().getTime() + "." + type;
      uploadPath = path.join(__dirname, '../../../storage-public/posts/' + name);

      sampleFile.mv(uploadPath, function (err) {
        if (err) {
          throw new ApiError(httpStatus.EXPECTATION_FAILED, err.message);
        }
        
        res.send({path: name});
      });
    } catch (err: any) {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, err.message);
    }
  });
}