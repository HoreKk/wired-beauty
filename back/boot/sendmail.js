const nodemailer = require('nodemailer');

module.exports = async (app) => {
  app.logger.info('[Mailer] Loading Mailer service..');
  try {
    if (app.transporter) return app.transporter;
    const transporter = nodemailer.createTransport(app.config.smtpConfig);
    transporter.verify((error) => {
      if (error) {
        app.logger.error(`[Mailer] ${error}`);
      } else {
        app.logger.info('[Mailer] Mailing service is up..');
      }
    });
    return transporter;
  } catch (error) {
    app.logger.error('[Mailer] Failed loading..', error);
  }
};
