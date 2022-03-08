module.exports = (app) => {
  app.logger = require('./logger')(app);
  app.logger.info('Booting api..');

  app.boot = async function boot(port, host) {
    app.logger.info('------------------------------');

    const server = require('http').createServer(app);
    app.transporter = await require('./sendmail')(app);
    app.db = await require('./database')(app);
    
    server.listen(port, '0.0.0.0', () => {
      app.logger.info(`Running in ${process.env.NODE_ENV} mode`);
      app.logger.info(`Api listening on http://${host}:${app.config.port}`);
    });
  };
};