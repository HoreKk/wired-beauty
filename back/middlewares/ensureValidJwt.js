module.exports = (app) => {
  return (req, res, next) => {
    const { User } = app.models;
    const { authorization } = req.headers;
    if (!authorization) return unauthorized();
    return app.helpers.user.verifyToken(authorization, { ignoreExpiration: true })
      .then((decryptedToken) => {
        const { id } = decryptedToken.data;
        return User.findOne({ _id: id, enabled: true });
      })
      .then((user) => {
        if (user) {
          req.user = {
            id: user._id
          };
        } else {
          return unauthorized();
        }
      })
      .then(next)
      .catch(unauthorized);

    function unauthorized() {
      res.sendStatus(401);
    }
  };
};
