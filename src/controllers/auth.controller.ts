import httpStatus from 'http-status';
import { catchAsync } from '../utils/catchAsync';
import userRepository from '../repositories/user.repository';
import tokenRepository from '../repositories/token.repository';
import authRepository from '../repositories/auth.repository';
import ApiError from '../utils/ApiError';
import emailRepository from '../repositories/email.repository';
import { encryptData } from '../utils/encriptation';

export default class AuthController {
  register = catchAsync(async (req: any, res: any) => {
    req.body.isEmailVerified = false;
    req.body.status = "Pending";
    req.body.password = encryptData(req.body.password as string);

    const user = await userRepository.save(req.body);
    //const tokens = await tokenRepository.generateAuthTokens(user);

    const verifyEmailToken = await tokenRepository.generateVerifyEmailToken(user);
    await emailRepository.sendVerificationEmail(user.type=='Company' ? user.company?.name! : user.person?.name!, user.email!, verifyEmailToken);

    res.status(httpStatus.CREATED).send(user);
  }); 

  login = catchAsync(async (req: any, res: any) => {
    const { email, password } = req.body;

    const user = await authRepository.loginUserWithEmailAndPassword(email, password)
    
    if(!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "Error looking for the credentials");
    }

    const tokens = await tokenRepository.generateAuthTokens(user);
    //const chats = await conversaService.getChats(user);

    if(user && !user.isEmailVerified) {
      authRepository.deleteOldVerifyTokens(user.id!);
      const verifyEmailToken = await tokenRepository.generateVerifyEmailToken(user);
      await emailRepository.sendVerificationEmail(user.type=='Company' ? user.company?.name! : user.person?.name!, user.email!, verifyEmailToken);
    }

    //res.send({ user, tokens, chats });
    res.send({ user, tokens, chats: [] });
  });

  logout = catchAsync(async (req: any, res: any) => {
    await authRepository.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  });

  refreshTokens = catchAsync(async (req: any, res: any) => {
    const tokens = await authRepository.refreshAuth(req.body.token, req.body.refreshToken);
    res.send({ ...tokens });
  });

  getUserByToken = catchAsync(async (req: any, res: any) => {
    if (req.user) {
      const fullUser = await userRepository.retrieveById(req.user.id, true)
      //const chats = await conversaService.getChats(req.user);
      //res.send({ user: req.user, chats });
      res.send({ user: fullUser });
    }
    else {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Login');
    }
  });

  forgotPassword = catchAsync(async (req: any, res: any) => {
    const resetPasswordToken = await tokenRepository.generateResetPasswordToken(req.body.email);
    await emailRepository.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
  });

  resetPassword = catchAsync(async (req: any, res: any) => {
    await authRepository.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
  });

  sendVerificationEmail = catchAsync(async (req: any, res: any) => {
    const verifyEmailToken = await tokenRepository.generateVerifyEmailToken(req.user);
    await emailRepository.sendVerificationEmail(req.user.type=='Company' ? req.user.company?.name! : req.user.person?.name!, req.user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
  });

  verifyEmail = catchAsync(async (req: any, res: any) => {
    await authRepository.verifyEmail(req.query.token);
    res.status(httpStatus.ACCEPTED).send(true);
  });
}