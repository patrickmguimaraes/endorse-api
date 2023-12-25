import express from 'express';
import { postValidation } from '../validations';
import { validate } from '../middlewares/validate';
import { auth } from '../middlewares/auth';
import PostController from '../controllers/post.controller';

class PostRoute {
    router = express.Router();
    postController = new PostController();

    constructor() {
        this.router.post('/getPost', auth('post'), validate(postValidation.getPost), this.postController.getPost);
        this.router.post('/post', auth('post'), validate(postValidation.post), this.postController.post);
        this.router.post('/newsFeed', auth('post'), validate(postValidation.newsFeed), this.postController.newsFeed);
        this.router.post('/viewed', auth('post'), validate(postValidation.viewed), this.postController.viewed);
        this.router.post('/power', auth('post'), validate(postValidation.power), this.postController.power);
        this.router.post('/unpower', auth('post'), validate(postValidation.unpower), this.postController.unpower);
        this.router.post('/endorse', auth('post'), validate(postValidation.endorse), this.postController.endorse);
        this.router.post('/poweredAndEndorsed', auth('post'), validate(postValidation.poweredAndEndorsed), this.postController.poweredAndEndorsed);
        this.router.post('/getPostName', auth('post'), validate(postValidation.getPostName), this.postController.getPostName);
    }
}

export default new PostRoute().router;