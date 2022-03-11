module.exports = (app) => {
  app.logger.info('Loading models..');
  require('./User.js')(app);
  require('./Study.js')(app);
  require('./File.js')(app);

}
