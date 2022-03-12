const res = require('../middlewares/res');

module.exports = async (app) => {
  app.logger.info('[MongoDB] Connecting to database..');
  const mongoose = require('mongoose');
  const uri = `mongodb://${app.config.database.host}/${app.config.database.name}?${app.config.database.option}`
  return mongoose.connect(uri)
  .then((db) => {
    app.logger.info('[MongoDB] Connected to the database..');
    return db;
  })
  .catch((err) => {
    app.logger.error('[MongoDB] Connection error: ', err);
    res.error({
      code: '500',
      type: 'database001',
      message: 'Connection error',
      err
    })
  });
};
