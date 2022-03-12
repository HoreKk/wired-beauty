module.exports = (app) => {
  //* Importing all the actions
  app.logger.info('Loading actions..');
  
  app.action = {
    authentication: require('./authentication')(app),
    user: require('./user')(app),
    study: require('./study')(app),
  }
}
