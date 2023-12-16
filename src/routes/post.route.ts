import express from 'express';
import { postValidation } from '../validations';
import { validate } from '../middlewares/validate';
import { auth } from '../middlewares/auth';
import PostController from '../controllers/post.controller';

class PostRoute {
    router = express.Router();
    postController = new PostController();

    constructor() {
        this.router.post('/post', auth('post'), validate(postValidation.post), this.postController.post);
        this.router.post('/newsFeed', auth('post'), validate(postValidation.newsFeed), this.postController.newsFeed);
    }
}

export default new PostRoute().router;