module.exports = (app) => {
  app.logger.info('Loading models..');
  require('./User.js')(app);

}
