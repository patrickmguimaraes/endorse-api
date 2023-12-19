import jwt from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';
import { config } from '../config/db.config';
import Token from '../models/token.model';
import User from '../models/user.model';
import { tokenTypes } from '../config/tokens';
import userRepository from './user.repository';
import ApiError from '../utils/ApiError';

class TokenRepository {
  /**
   * Generate token
   * @param {ObjectId} userId
   * @param {Moment} expires
   * @param {string} type
   * @param {string} [secret]
   * @returns {string}
   */
  async generateToken(userId: number | undefined, expires: any, type: string, secret = config.jwt.secret) {
    const payload = {
      sub: userId?.toString(),
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };

    return jwt.sign(payload, secret);
  };

  /**
   * Save a token
   * @param {string} token
   * @param {ObjectId} userId
   * @param {Moment} expires
   * @param {string} type
   * @param {boolean} [blacklisted]
   * @returns {Promise<Token>}
   */
  async saveToken (token: string, userId: number | undefined, expires: any, type: any, blacklisted: boolean = false) {
    const tokenDoc = await Token.create({
      token,
      userId: userId?.toString(),
      expires: expires.toDate(),
      type,
      blacklisted,
    });

    return tokenDoc;
  };

  /**
   * Verify token and return token doc (or throw an error if it is not valid)
   * @param {string} token
   * @param {string} type
   * @returns {Promise<Token>}
   */
  async verifyToken (token: string, type: string) {
    const payload = jwt.verify(token, config.jwt.secret);

    const tokenDoc = await Token.findOne({ where: { token: token, type: type, userId: Number.parseInt(payload.sub as string), blacklisted: false } });

    if (!tokenDoc) {
      throw new Error('Token not found');
    }

    return tokenDoc;
  };

  /**
   * Generate auth tokens
   * @param {User} user
   * @returns {Promise<Object>}
   */
  async generateAuthTokens (user: User) {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = this.generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);
    await this.saveToken(await accessToken, user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = this.generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
    await this.saveToken(await refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
      access: {
        token: await accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: await refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };

  /**
   * Generate reset password token
   * @param {string} email
   * @returns {Promise<string>}
   */
  async generateResetPasswordToken(email: string) {
    const user = await userRepository.existsEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
    }
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
    const resetPasswordToken = await this.generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
    await this.saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
    return resetPasswordToken;
  };

  /**
   * Generate verify email token
   * @param {User} user
   * @returns {Promise<string>}
   */
  async generateVerifyEmailToken(user: User) {
    const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
    const verifyEmailToken = await this.generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
    await this.saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
    return verifyEmailToken;
  };
}

export default new TokenRepository()