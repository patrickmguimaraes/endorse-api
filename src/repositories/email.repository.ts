import nodemailer from 'nodemailer';
import { config } from '../config/db.config';
import { logger } from '../config/logger';
import pug from "pug";
import path from 'path';

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
    const text = ``;
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
    while (tokenModified.includes(".")) {
      tokenModified = tokenModified.replace(".", "-_-");
    }

    const subject = 'Email Verification';
    var verificationEmailUrl = config.env === 'development' ? `http://localhost:4200/verify-email/${tokenModified}` : `https://endorseanidea.com/verify-email/${tokenModified}`;
    const termsOfUseUrl = config.env === 'development' ? `http://localhost:4200/terms-conditions` : `https://endorseanidea.com/terms-conditions`;
    const privacyPolicyUrl = config.env === 'development' ? `http://localhost:4200/privacy-policy` : `https://endorseanidea.com/privacy-policy`;
    const website = config.env === 'development' ? `http://localhost:4200` : `https://endorseanidea.com`;
    
    const emailData = {
      verificationEmailUrl,
      website,
      termsOfUseUrl,
      privacyPolicyUrl
    };
    
    const compiledFunction = pug.compileFile(path.join(__dirname, '../../../src/email-templates/confirm-email.pug'));
    
    const emailHTML = compiledFunction(emailData);

    let info = await this.transport.sendMail({
      from: config.email.from,
      to: to,
      subject: subject,
      html: emailHTML,
    });

    return info;
  };
}

export default new EmailRepository();