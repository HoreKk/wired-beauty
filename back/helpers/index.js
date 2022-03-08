module.exports = (app) => {
  app.logger.info('Loading helpers..');
  app.helpers = {
    ensureOne,
    reject,
    isObject,
    user: require('./user')(app)
  };

  function ensureOne(data) {
    return data || Promise.reject(new Error('No entry found'));
  }

  /**
   ** [Reject error respecting the format code, type, fields, data, message, error]
   * @param {number} code http error code
   * @param {string} type app error code
   * @param {string} fields Array of field concerned by the error
   * @param {string} data data for some case
   * @param {string} message message describing the error for dev ENV
   * @param {object} error raw error for dev END
   * @returns {PromiseRejectionEvent}
   */
  function reject({ code, type, fields = [], data, message, error, display = 'error.unknownError' }) {
    try {
      throw new Error(message);
    } catch (err) {
      app.logger.error(err);
      return Promise.reject({
        code,
        type,
        fields,
        data,
        message,
        err: error,
        display
      });
    }
  }

  /**
   * Determine is the given value is an object or not
   * @param {*} value The value to be tested as an object
   * @see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript/8511350#8511350
   */
  function isObject(value) {
    if (value === null) return false;
    return ((typeof value === 'function') || (typeof value === 'object'));
  }
};
