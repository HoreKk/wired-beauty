module.exports = (app) => {
  return (req, res, next) => {
    const { authorization } = req.headers;
    const { User } = app.models;

    if (!authorization) return unauthorized();

    return app.helpers.user.verifyToken(authorization)
      .then(decryptedToken => {
        const { id } = decryptedToken.data;
        return User.findOne({ _id: id, enabled: true });
      })
      .then((user) => {
        return req.user = {
          id: user._id
        };
      })
      .then(() => next())
      .catch(unauthorized);

    function unauthorized(error) {
      if (!error) {
        res.error({
          code: 401,
          type: 'm001',
          message: 'NoTokenSent',
          err: new Error('NoTokenSent'),
          display: 'error.NoTokenSent',
        });
      } else {
        let err = null;
        switch (error.name) {
          case 'TokenExpiredError':
            err = {
              code: 401,
              type: 'm002',
              message: 'TokenSessionExpired',
              err: new Error('TokenSessionExpired'),
              display: 'error.tokenSessionExpired',
            };
            break;
          case 'JsonWebTokenError':
            err = {
              code: 403,
              type: 'm003',
              message: `${error.message}`,
              display: 'error.invalidToken',
              err: new Error('Invalid Token'),
            };
            break;
          default:
            err = error;
            break;
        }
        res.error(err);
      }
    }
  };
};
