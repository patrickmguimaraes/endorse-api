import express from 'express';
import { followerValidation } from '../validations';
import { validate } from '../middlewares/validate';
import { auth } from '../middlewares/auth';
import FollowerController from '../controllers/follower.controller';

class FollowerRoute {
    router = express.Router();
    followerController = new FollowerController();

    constructor() {
        this.router.post('/follow', auth('follow'), validate(followerValidation.follow), this.followerController.follow);
        this.router.post('/unfollow', auth('follow'), validate(followerValidation.unfollow), this.followerController.unfollow);
        this.router.post('/suggests', auth('follow'), validate(followerValidation.suggests), this.followerController.suggests);
        this.router.post('/isFollowing', auth('follow'), validate(followerValidation.isFollowing), this.followerController.isFollowing);
        this.router.post('/followingNumber', auth('follow'), validate(followerValidation.followingNumber), this.followerController.followingNumber);
    }
}

export default new FollowerRoute().router;