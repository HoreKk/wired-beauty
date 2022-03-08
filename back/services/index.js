module.exports = (app) => {
  app.logger.info('Loading services..');
  app.services = {
    user: require('./user')(app),
  };
}