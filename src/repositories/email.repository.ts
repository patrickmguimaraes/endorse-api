import nodemailer from 'nodemailer';
import { config } from '../config/db.config';
import { logger } from '../config/logger';

class EmailRepository {
  public transport = nodemailer.createTransport(config.email.smtp);

  constructor() {
    /* istanbul ignore next */
    if (config.env !== 'test') {
      this.transport.verify()
        .then(() => logger.info('Connected to email server'))
        .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
    }
  }

  /**
   * Send an email
   * @param {string} to
   * @param {string} subject
   * @param {string} text
   * @returns {Promise}
   */
  async sendEmail(to: string, subject: string, text: string) {
    const msg = { from: config.email.from, to, subject, text };
    await this.transport.sendMail(msg);
  };

  /**
   * Send reset password email
   * @param {string} to
   * @param {string} token
   * @returns {Promise}
   */
  async sendResetPasswordEmail(to: string, token: string) {
    const subject = 'Reset password';
    // replace this url with the link to the reset password page of your front-end app
    const resetPasswordUrl = config.env === 'development' ? `http://localhost:4200/reset-password/${token}` : `https://endorseanidea.com/reset-password/${token}`;
    const text = `Dear user,
      To reset your password, click on this link: ${resetPasswordUrl}
      If you did not request any password resets, then ignore this email.`;
    await this.sendEmail(to, subject, text);
  };

  /**
   * Send verification email
   * @param {string} to
   * @param {string} token
   * @returns {Promise}
   */
  async sendVerificationEmail(name: string, to: string, token: string) {
    var tokenModified = token;
    while(tokenModified.includes(".")) {
      tokenModified = tokenModified.replace(".", "-_-");
    }

    const subject = 'Email Verification';
    // replace this url with the link to the email verification page of your front-end app
    var verificationEmailUrl = config.env === 'development' ? `http://localhost:4200/verify-email/${tokenModified}` : `https://endorseanidea.com/verify-email/${tokenModified}`;
    
    const text = `  Dear ${name},

      To verify your email, click on this link: ${verificationEmailUrl}
      
      If you did not create an account, then ignore this email.
      
      Thank you,
      Endorse Team`;
    await this.sendEmail(to, subject, text);
  };
}

export default new EmailRepository();