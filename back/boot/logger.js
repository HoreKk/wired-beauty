const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, json, colorize, simple, label } = format;
const path = require('path');
const pjson = require(path.join(__dirname, '../package.json'));

const logFormat = printf(({ 
  level, message, timestamp, label
}) => `${timestamp} [${level}][${label}] : ${message} `);

module.exports = (app) => {
  const appName = pjson.name;

  //* Initialize logger method
  const logger = createLogger({
    level: 'info',
    format: combine(
      label({ label: pjson.name }),
      timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
      }),
      json()
    )
  });

  //* If we're not in production then log to the `console`
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      level: 'debug',
      format: combine(
        colorize(),
        simple(),
        logFormat
      )
    }));
  } else {
    logger.add(new transports.File({ filename: 'logs/error.log', level: 'error' }));
    logger.add(new transports.File({ filename: 'logs/combined.log' }));
  }


  logger.info(`Starting ${appName} api`);

  return logger;
}
