import express from 'express';
import { authValidation } from '../validations';
import { validate } from '../middlewares/validate';
import { auth } from '../middlewares/auth';
import AuthController from '../controllers/auth.controller';

class AuthRoute {
    router = express.Router();
    authController = new AuthController();

    constructor() {
        this.router.post('/register', validate(authValidation.register), this.authController.register);
        this.router.post('/login', validate(authValidation.login), this.authController.login);
        this.router.post('/me', auth('autoManagement'), validate(authValidation.me), this.authController.getUserByToken);
        this.router.post('/logout', validate(authValidation.logout), this.authController.logout);
        this.router.post('/refresh-tokens', validate(authValidation.refreshTokens), this.authController.refreshTokens);
        this.router.post('/forgot-password', validate(authValidation.forgotPassword), this.authController.forgotPassword);
        this.router.post('/reset-password', validate(authValidation.resetPassword), this.authController.resetPassword);
        this.router.post('/send-verification-email', auth(), this.authController.sendVerificationEmail);
        this.router.get('/verify-email', validate(authValidation.verifyEmail), this.authController.verifyEmail);
    }
}

export default new AuthRoute().router;