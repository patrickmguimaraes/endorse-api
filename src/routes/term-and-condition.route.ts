import express from 'express';
import TermAndConditionController from '../controllers/term-and-condition.controller';

class TermAndConditionRoute {
    router = express.Router();
    controller = new TermAndConditionController();

    constructor() {
        this.router.get('/getAll', this.controller.getAll);
    }
}

export default new TermAndConditionRoute().router;