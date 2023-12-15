import jwt from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';
import { config } from '../config/db.config';
import Token from '../models/token.model';
import User from '../models/user.model';
import { tokenTypes } from '../config/tokens';
import userRepository from './user.repository';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcryptjs';
import tokenRepository from './token.repository';

class AuthRepository {
  /**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Usuario>}
 */
  async loginUserWithEmailAndPassword(email: string, password: string) {
    const user = await userRepository.existsEmail({email});
    const isEqual = bcrypt.compare(password, user?.password!);

    if (!user || !isEqual) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
  };

  /**
   * Logout
   * @param {string} refreshToken
   * @returns {Promise}
   */
  async logout(refreshToken: string) {
    const refreshTokenDoc = await Token.findOne({ where: {token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false } });
    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.destroy();
  };

  /**
   * Refresh auth tokens
   * @param {string} refreshToken
   * @returns {Promise<Object>}
   */
  async refreshAuth(token: string, refreshToken: string) {
    const refreshTokenDoc = await tokenRepository.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userRepository.retrieveById(refreshTokenDoc.userId);
    
    console.log(user)
    
    if (!user) {
      throw new Error();
    }
    
    await refreshTokenDoc.destroy();
    return tokenRepository.generateAuthTokens(user);
  };

  /**
   * Reset password
   * @param {string} resetPasswordToken
   * @param {string} newPassword
   * @returns {Promise}
   */
  async resetPassword(resetPasswordToken: string, newPassword: string) {
    try {
      const resetPasswordTokenDoc = await tokenRepository.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
      const user = await userRepository.retrieveById(resetPasswordTokenDoc.userId);
      
      if (!user) {
        throw new Error();
      }

      user.password = newPassword;

      await userRepository.update(user);

      const tokens = await Token.findAll({where: { userId: user.id, type: tokenTypes.RESET_PASSWORD }});

      tokens.forEach(t=>{
        t.destroy();
      })
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
  };

  /**
   * Verify email
   * @param {string} verifyEmailToken
   * @returns {Promise}
   */
  async verifyEmail(verifyEmailToken: string) {
    try {
      const verifyEmailTokenDoc = await tokenRepository.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
      
      if(!verifyEmailTokenDoc) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired!');
      }

      const user = await userRepository.retrieveById(verifyEmailTokenDoc.userId);
      
      if (!user) {
        throw new Error();
      }
      
      await User.update(
        { isEmailVerified: true, status: "Active" },
        { where: { id: user.id } }
      );

      this.deleteOldVerifyTokens(user.id!);
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
  };

  async deleteOldVerifyTokens(id: number) {
    const tokens = await Token.findAll({where: { userId: id, type: tokenTypes.VERIFY_EMAIL }});

      tokens.forEach(t=>{
        t.destroy();
      })
  }
}

export default new AuthRepository()