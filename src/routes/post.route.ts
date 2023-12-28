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
        this.router.post('/getNumbersPosts', auth('post'), validate(postValidation.getNumbersPosts), this.postController.getNumbersPosts);

        //Showcase
        this.router.post('/showcase', auth('post'), validate(postValidation.showcase), this.postController.showcase);
        this.router.post('/deleteShowcaseTag', auth('post'), validate(postValidation.deleteShowcaseTag), this.postController.deleteShowcaseTag);
        this.router.post('/addTag', auth('post'), validate(postValidation.addTag), this.postController.addTag);

        //Collaboration
        this.router.get('/getAllCollaborationCategories', auth('post'), this.postController.getAllCollaborationCategories);
        this.router.post('/collaboration', auth('post'), validate(postValidation.collaboration), this.postController.collaboration);
        this.router.post('/deleteCollaboration', auth('post'), validate(postValidation.deleteCollaboration), this.postController.deleteCollaboration);
        this.router.post('/deleteCollaborationSkill', auth('post'), validate(postValidation.deleteCollaborationSkill), this.postController.deleteCollaborationSkill);
        this.router.post('/addCollaborationSkill', auth('post'), validate(postValidation.addCollaborationSkill), this.postController.addCollaborationSkill);
        this.router.post('/similarCollaborations', auth('post'), validate(postValidation.similarCollaborations), this.postController.similarCollaborations);
        this.router.post('/applyCollaboration', auth('post'), validate(postValidation.applyCollaboration), this.postController.applyCollaboration);
        this.router.post('/changeCollaborationRequestStatus', auth('post'), validate(postValidation.changeCollaborationRequestStatus), this.postController.changeCollaborationRequestStatus);
    }
}

export default new PostRoute().router;