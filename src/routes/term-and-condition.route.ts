import express from 'express';
import TermAndConditionController from '../controllers/term-and-condition.controller';

class TermAndConditionRoute {
    router = express.Router();
    controller = new TermAndConditionController();

    constructor() {
        this.router.get('/getLast', this.controller.getLast);
    }
}

export default new TermAndConditionRoute().router;