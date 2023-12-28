import fileUpload from 'express-fileupload';
import { catchAsync } from '../utils/catchAsync';
import path from "path";
import fs from "fs";
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import postRepository from '../repositories/post.repository';
import File from '../models/file.model';
import fileRepository from '../repositories/file.repository';

export default class StorageController {
  savePostImage = catchAsync(async (req: any, res: any) => {
    try {
      let sampleFile: fileUpload.UploadedFile;
      let uploadPath: string;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      if (!fs.existsSync(path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/'))) {
        fs.mkdirSync(path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/'), { recursive: true });
      }

      sampleFile = req.files.file as fileUpload.UploadedFile;
      const name: string = new Date().getTime() + ".png";
      uploadPath = path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/' + name);

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

      if (!fs.existsSync(path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/'))) {
        fs.mkdirSync(path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/'), { recursive: true });
      }

      sampleFile = req.files.file as fileUpload.UploadedFile;
      var type = sampleFile.mimetype.substring(sampleFile.mimetype.search("/") + 1);
      const name: string = new Date().getTime() + "." + type;
      uploadPath = path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/' + name);

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

  attachShowcaseFile = catchAsync(async (req: any, res: any) => {
    try {
      const post = await postRepository.getPostById(req.params.postId);

      if(!post || post.userId!=req.user.id) {
        throw new ApiError(httpStatus.LOCKED, 'The post you want to update is from another user!');
      }

      let sampleFile: fileUpload.UploadedFile;
      let uploadPath: string;

      if (!req.files || Object.keys(req.files).length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'No files were uploaded!');
      }

      if (!fs.existsSync(path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/' + req.params.postId + "/showcase"))) {
        fs.mkdirSync(path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/' + req.params.postId + "/showcase"), { recursive: true });
      }

      sampleFile = req.files.file as fileUpload.UploadedFile;
      var type = sampleFile.mimetype.substring(sampleFile.mimetype.search("/") + 1);
      const name: string = new Date().getTime() + "." + type;
      uploadPath = path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/' + req.params.postId + "/showcase/" + name);

      sampleFile.mv(uploadPath, async function (err) {
        if (err) {
          throw new ApiError(httpStatus.EXPECTATION_FAILED, err.message);
        }
        
        if(req.params.showcaseId && req.params.showcaseId>0) {
          const file = await fileRepository.save({showcaseId: req.params.showcaseId, name: name, type: type, path: name, userId: req.user.id});
          res.send(file);
        }
        else {
          res.send({path: name});
        }
      });
    } catch (err: any) {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, err.message);
    }
  });

  deleteShowcaseFile = catchAsync(async (req: any, res: any) => {
    try {
      if(req.body.file.userId != req.user.id) {
        throw new ApiError(httpStatus.LOCKED, 'You want to delete a file from other user!');
      }
  
      const filePath = path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/' + req.body.showcase.postId + "/showcase/" + req.body.file.path);
  
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      if(req.body.file.id) {
        const fileDeleted = await fileRepository.delete(req.body.file);
        res.send(fileDeleted>0);
      }
      else {
        res.send(true);
      }
    } catch (error: any) {
      console.log(error.message)
      res.send(false);
    }
  });

  saveCurriculum = catchAsync(async (req: any, res: any) => {
    try {
      let sampleFile: fileUpload.UploadedFile;
      let uploadPath: string;

      if (!req.files || Object.keys(req.files).length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'No files were uploaded!');
      }

      if (!fs.existsSync(path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/' + req.params.postId + "/collaboration/" + req.params.collaborationId))) {
        fs.mkdirSync(path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/' + req.params.postId + "/collaboration/" + req.params.collaborationId), { recursive: true });
      }

      sampleFile = req.files.file as fileUpload.UploadedFile;
      var type = sampleFile.mimetype.substring(sampleFile.mimetype.search("/") + 1);
      const name: string = new Date().getTime() + "." + type;
      uploadPath = path.join(__dirname, '../../../storage-public/users/' + req.user.id + '/posts/' + req.params.postId + "/collaboration/" + req.params.collaborationId + "/" + name);

      sampleFile.mv(uploadPath, async function (err) {
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