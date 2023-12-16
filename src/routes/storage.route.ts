import express from 'express';
import StorageController from '../controllers/storage.controller';

class StorageRoute {
    router = express.Router();
    controller = new StorageController();

    constructor() {
        this.router.post('/savePostImage', this.controller.savePostImage);
        this.router.post('/savePostVideo', this.controller.savePostVideo);
    }
}

export default new StorageRoute().router;