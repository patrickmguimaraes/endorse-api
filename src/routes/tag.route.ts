import express from 'express';
import { tagValidation } from '../validations';
import { validate } from '../middlewares/validate';
import { auth } from '../middlewares/auth';
import TagController from '../controllers/tag.controller';

class TagRoute {
    router = express.Router();
    postController = new TagController();

    constructor() {
        this.router.post('/findOrCreate', auth('tag'), validate(tagValidation.findOrCreate), this.postController.findOrCreate);
    }
}

export default new TagRoute().router;