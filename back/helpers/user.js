const { verify, sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  return {
    hashPassword,
    verifyToken,
    createToken,
    createRefreshToken
  };

  async function hashPassword(password) {
    return bcrypt.hash(password, app.config.auth.user.saltRounds);
  }

  /**
   * Sign a new token for the authenticated user
   * @param {Object} user
   */
  function createToken(cryptedData) {
    return new Promise((resolve, reject) => {
      sign({
        data: { ...cryptedData }
      }, process.env.TOKEN_SECRET, {
        expiresIn: app.config.auth.token.lifeTime
      }, async (err, encryptedToken) => {
        if (err) return reject(err);
        return resolve(encryptedToken);
      });
    });
  }

  /**
   * Sign a new token for the authenticated user
   * @param {Object} user
   */
  function createRefreshToken(cryptedData) {
    return new Promise((resolve, reject) => {
      sign({
        data: { ...cryptedData }
      }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: app.config.auth.refreshToken.expiration
      }, async (err, encryptedToken) => {
        if (err) return reject(err);
        return resolve(encryptedToken);
      });
    });
  }

  /**
   * Verify the token for the authenticated user
   * @param {Object} user
   */
  function verifyToken(authorization, option = {}) {
    return new Promise((resolve, reject) => {
      verify(
        authorization,
        process.env.TOKEN_SECRET,
        option,
        (err, decryptedToken) => {
          if (err) return reject(err);
          return resolve(decryptedToken);
        }
      );
    });
  }

  /**
   * Generate random string of the given length
   * @see https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
   * @param {Number} length The length of the random string
   */
  function _random(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
};
