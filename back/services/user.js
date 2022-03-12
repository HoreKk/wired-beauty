module.exports = (app) => {
  const { User } = app.models;
  return {
    count,
    findWithPagination,
    findById,
    findByEmail,
    insertUser,
    updateUserService,
    isRefreshTokenValid,
    updateRefreshToken,
    deleteById,
    updateResetPasswordToken,
    changePassword,
    removeResetPasswordToken,
  };

  // Count Users
  function count() {
    return User.countDocuments().exec()
    .then(result => {
      return result;
    })
    .catch((error) => {
      return app.helpers.reject({
        code: 401,
        type: 's002',
        fields: [],
        message: 'userNotFound',
        display: 'error.userNotFound',
        error
      });
    });
  }

  // Find User by _id
  function findWithPagination(page, numberPerPage) {
    return User.find().skip((page - 1) * numberPerPage).limit(numberPerPage).exec()
    .then(result => {
      return result;
    })
    .catch((error) => {
      return app.helpers.reject({
        code: 401,
        type: 's002',
        fields: [],
        message: 'userNotFound',
        display: 'error.userNotFound',
        error
      });
    });
  }

  // Find User by email
  function findByEmail(email, show = 0) {
    return User.findOne(
      { email },
      show ? {} : { password: 0 }
      ).exec()
      .then((result) => {
        console.log('eee', result)
      // Returns null is no match found
      // Returns the document if found
      return result;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s001",
        message: "Couldn't check if Email is registered",
        display: "error.findByEmail",
        error
      });
    });
  }

  // Find User by _id
  function findById(id) {
    return User.findById(id).exec()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return app.helpers.reject({
        code: 401,
        type: 's002',
        fields: [],
        message: 'userNotFound',
        display: 'error.userNotFound',
        error
      });
    });
  }

  // Insert the new User
  function insertUser(body, session) {
    console.log(body)
    return User.create({
      ...body
    })
    .then((data) => {
      console.log(data)
      return data;
    })
    .catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s003",
        message: "Couldn't create User",
        display: "error.createUser",
        error
      });
    });
  }

  // Update the User
  function updateUserService(req, session) {
    const { params, body } = req;
    return User.updateOne({ "_id": params.id }, body, session)
    .then(async (data) => {
      if (!data) return app.helpers.reject(new Error('User not found'));
      return data;
    })
    .catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s004",
        message: "Couldn't update User",
        display: "error.updateUser",
        error
      });
    })
  }

  // Check if refresh_token exists and if it is not expired
  async function isRefreshTokenValid(refreshToken) {
    if (!refreshToken) return false;
    return await User.findOne(
      { refresh_token: refreshToken },
      { refresh_token: 1 }
    ).exec()
    .then((result) => {
      if (!result.refresh_token) return false;
      const verify_token = app.middlewares.jwtoken.verify(result.refresh_token, process.env.REFRESH_TOKEN_SECRET);
      if (verify_token && verify_token.exp > Math.floor(Date.now() / 1000 + (60 * 60 * 24 * 7))) {
        return true;
      }
      return false;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s005",
        message: "Couldn't check for Refresh Token",
        display: "error.isRefreshTokenValid",
        error
      });
    });
  }

  // Used to renew the refresh token
  function updateRefreshToken(data) {
    const { user, refreshToken, isValid, isLogin = true } = data;
    return User.updateOne({ "email": user.email }, {
      ...(!isValid ? {
        refresh_token: refreshToken,
        ...(isLogin ? { last_login: Date.now() } : {})
      } : {
        last_login: Date.now()
      })
    })
    .then(async (data) => {
      if (!data) return app.helpers.reject(new Error('User not found'));
      return data;
    })
    .catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s006",
        message: "Couldn't update the user refresh token",
        display: "error.RefreshTokenUpdate",
        error
      });
    })
    .then(() => findByEmail(user.email));
  }

  // Delete User by _id
  function deleteById(id) {
    return User.deleteOne({ _id: id }).exec()
    .then(app.helpers.ensureOne)
    .catch((error) => {
      return app.helpers.reject({
        code: 400,
        type: 's002',
        fields: [],
        message: 'userDeleteError',
        display: 'error.userDeleteError',
        error
      });
    });
  }

  function updateResetPasswordToken(email, token) {
    return User.update({
      password_reset_token: token,
      last_reset_password: new Date()
    }, {
      where: {
        email
      }
    }).then(app.helpers.ensureOne)
      .catch((error) => {
        return app.helpers.reject({
          code: 401,
          type: 'err203',
          fields: [],
          message: 'passwordResetTokenCreationError',
          display: 'error.passwordResetTokenCreationError',
          error
        });
      });
  }

  async function changePassword(password, reset_password_token) {
    const { hashPassword } = app.helpers.user;
    return User.updateOne(
        { reset_password_token: reset_password_token, enabled: false },
        { $set: { password: await hashPassword(password) }}
      )
      .catch((error) => {
        return app.helpers.reject({
          code: 400,
          type: 'err301',
          message: 'passwordUpdateError',
          display: 'error.passwordUpdateError',
          error
        });
      });
  }

  function removeResetPasswordToken(token) {
    return User.updateOne(
      { reset_password_token: token },
      { $unset: { reset_password_token: 1 }, $set: { enabled: true }},
    ).then(app.helpers.ensureOne)
      .catch((error) => {
        return app.helpers.reject({
          code: 401,
          type: 'err207',
          fields: [],
          message: 'passwordResetTokenDeleteError',
          display: 'error.passwordResetTokenDeleteError',
          error
        });
      });
  }

}
