const cors = require('cors');
const helmet = require('helmet');

module.exports = (app) => {
  app.logger.info('Loading middlewares..');
  app.disable('x-powered-by');
  app.use(helmet());

  // CORS
  app.use(cors());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', app.config.cors.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, token');
    next();
  });

  app.use(require('./res')(app));
  app.middlewares = {
    bodyParser: require('body-parser'),
    ensureAuthenticated: require('./ensureAuthenticated')(app),
    ensureValidJwt: require('./ensureValidJwt')(app),
    jwtoken: require('jsonwebtoken')
  };
};
