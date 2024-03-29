import express from 'express';
import StorageController from '../controllers/storage.controller';
import { auth } from '../middlewares/auth';

class StorageRoute {
    router = express.Router();
    controller = new StorageController();

    constructor() {
        this.router.post('/deleteShowcaseFile', auth('post'), this.controller.deleteShowcaseFile);
        this.router.post('/savePostImage', auth('post'), this.controller.savePostImage);
        this.router.post('/savePostVideo', auth('post'), this.controller.savePostVideo);
        this.router.post('/attachShowcaseFile/:postId&:showcaseId', auth('post'), this.controller.attachShowcaseFile);
        this.router.post('/saveCurriculum/:postId&:collaborationId', auth('post'), this.controller.saveCurriculum);
        this.router.post('/attachFileCopyright/:postId', auth('post'), this.controller.attachFileCopyright);
    }
}

export default new StorageRoute().router;