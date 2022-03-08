const path = require('path');
const { Validator } = require('jsonschema');
const validator = new Validator();
module.exports = (app) => {
  app.logger.info('Loading configuration file..')
  // Load either config.json or config-dev.json, regarding the NODE_ENV variable
  const env = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '-dev' : '';
  const configFile = `./config${env}.json`;

  const config = require(path.resolve(__dirname, configFile));
  const schema = require(path.resolve(__dirname, 'config-validator.json'));

  const configValidation = validator.validate(config, schema);
  // Verify is the config format correspond to the config-validator
  if (!configValidation.valid) {
    // Log the difference between the to files
    // And end process with error code
    app.logger.error('Config format does not match validator..');
    app.logger.error(configValidation.errors);
    return process.exit(1);
  }

  app.logger.info('Configuration file initialized..');
  // Set the config
  return app.config = config;
};
