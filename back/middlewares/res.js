const { application } = require('express');

module.exports = (app) => {
  return (req, res, next) => {
    res.success = (data) => {
      if (!data) {
        return res.status(204).send();
      }
      return res.json(data);
    };

    res.error = (error) => {
      app.logger.error(error);
      // add message and error if in dev
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        if (!error.code) {
          return res.status(400).send({
            type: 'err301',
            fields: [],
            data: '',
            message: 'UnknownError',
            err: error || '',
            display: 'error.unknownError'
          });
        }
        const {
          code,
          type,
          fields,
          data,
          message,
          display,
          err
        } = error;

        return res.status(code).send({
          type,
          fields: fields || [],
          data: data || '',
          message,
          display,
          err: err ? err.toString() : ''
        });
      }

      // add message and error if in dev
      if (!error.code) {
        return res.status(400).send({ type: 'err301', fields: [], data: '', display: 'error.unknownError' });
      }
      const {
        code,
        type,
        fields,
        data,
        display
      } = error;
      return res.status(code).send({ type, fields: fields || [], data: data || '', display });
    };

    next();
  };
}
