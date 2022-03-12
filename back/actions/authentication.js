const bcrypt = require('bcrypt');

module.exports = (app) => {
  const { User } = app.models;
  const { findByEmail, insertUser, updateUserService, isRefreshTokenValid, updateRefreshToken, updateResetPasswordToken } = app.services.user;
  const { createToken, createRefreshToken } = app.helpers.user;

  return {
    login,
    register,
    refreshToken,
    accessToken,
    userManagementUserCreate,
    setResetPassword,
    verifyResetPasswordToken,
  };

  function login(req, res) {
    return findByEmail(req.body.email, 1)
      .then(async (user) => {
        if (user && req.body.password) {
          const match = await bcrypt.compare(req.body.password, user.password);
          if (match) {
            const token = await createToken({ id: user._id, email: user.email });
            const isValid = await isRefreshTokenValid(user.refresh_token);
            const refreshToken = ( isValid ? user.refresh_token : await createRefreshToken({}));
            return { user, token, refreshToken, isValid };
          }
        }
        return app.helpers.reject({
          code: 401,
          type: 'a005',
          fields: Object.keys(req.body),
          message: 'Incorrect Credentials',
          display: 'error.incorrectCredential',
          error: new Error('incorrectCredential')
        });
      })
      .then(async (data) => {
        const user = await updateRefreshToken(data);
        return { ...user._doc, token: data.token };
      })
      .then(res.success)
      .catch((error) => {
        return res.error({
          code: "500",
          type: "a001",
          message: "Api loading error",
          display: "error.serverComponents",
          err: error
        });
      });
  };

  async function register(req, res) {
    const { email, firstname, lastname, password } = req.body;

    // Check if essential body data exists
    if ((!email || email === '') || !firstname || !lastname || !password) {
      return res.error({
        code: "200",
        type: "a004",
        message: "Unauthorized use of the api",
        display: "error.unauthorizedUseOfTheApi"
      });
    }

    // Start a new db session and transaction
    const session = await app.db.startSession();
    await session.startTransaction();

    const options = { session, new: true, setDefaultsOnInsert: true };
    try {
      // Check if User already exists
      return findByEmail(req.body.email)
      .then((result) => {
        // If result is null we can create the User else throw error
        if (result) {
          return res.error({
            code: "401",
            type: "a003",
            message: "Email is already registered",
            display: "error.emailAlreadyRegistered"
          });
        }
        // Insert the new User
        insertUser(req.body, options)
        .then(async (data) => {
          // User created successfully, we can commit Transaction
          await session.commitTransaction();
          // Then end the Mongoose session
          session.endSession();
          // return the new User
          const { sendMail } = app.transporter;
          // TODO send mail after user's creation //

          return res.success(data);
        })
        .catch((error) => {
          // Return the error from insertUser service
          return res.error(error);
        });
      }).catch((error) => {
        // Return error is there was an issue with findByEmail
        return res.error({
          code: "400",
          type: "a002",
          message: "Error creating User",
          display: "error.createUser",
          err: error
        });
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      // If a component couldn't load we throw an error
      return res.error({
        code: "500",
        type: "a001",
        message: "Error on loading application modules",
        display: "error.serverComponents",
        err: error
      });
    }
  };

  /**
   * Refresh the JWT to the given user
   * @param  {object}   req  Expresss request
   * @param  {object}   res  Expresss responseNoParamsSent
   * @param  {Function} next Next middleware
   * @return {Promise}       returned Promise
   */
  async function refreshToken(req, res) {
    // Find the enabled user associated with the ID contained in the jwt and
    // The refresh token sent in the body of which the creation date is less than the configured amount of time
    // For example 7 DAYS
    if (!req.body.refresh_token) {
      return res.sendStatus(401);
    }
    return User.findOne({
      _id: req.body.id,
      enabled: true,
      refresh_token: req.body.refresh_token,
    }, { password: 0 })
    .exec()
    .catch((error) => {
      return app.helpers.reject({
        code: 401,
        type: 'a006',
        fields: Object.keys(req.body),
        message: 'invalidRefreshToken',
        display: 'error.invalidRefreshToken'
      });
    })
    .then(async (user) => {
      // If the user is found
      // Create a new refresh token and update the token
      const refreshToken = await createRefreshToken({ id: user._doc._id, email: user._doc.email });
      const userData = await updateRefreshToken({ user: { id: user._doc._id, email: user._doc.email }, refreshToken, isValid: false, isLogin: false });
      // Then create a new JWT to be sent to the user
      const token = await createToken({ id: userData._doc._id, email: userData.email });
      return { ...userData._doc, token };
    })
    .then(res.success)
    .catch(() => {
      res.error({
        code: 401,
        type: 'a006',
        fields: Object.keys(req.body),
        message: 'invalidRefreshToken',
        display: 'error.invalidRefreshToken'
      });
    });
  }

  /**
   * Refresh the JWT to the given user
   * @param  {object}   req  Expresss request
   * @param  {object}   res  Expresss responseNoParamsSent
   * @param  {Function} next Next middleware
   * @return {Promise}       returned Promise
   */
  async function accessToken(req, res) {
    // Find the enabled user associated with the ID contained in the jwt and
    if (!req.body.refresh_token) {
      return res.sendStatus(401);
    }
    let isValid = false;
    isValid = await isRefreshTokenValid(req.body.refresh_token)
    if (!isValid) return res.sendStatus(401);

    return User.findOne({
      refresh_token: req.body.refresh_token,
      enabled: true
    }, { password: 0 })
    .exec()
    .catch((error) => {
      return app.helpers.reject({
        code: 401,
        type: 'a006',
        fields: Object.keys(req.body),
        message: 'invalidRefreshToken',
        display: 'error.invalidRefreshToken'
      });
    })
    .then(async (user) => {
      // If the user is found
      // Create a new token and send it to the user
      // Then create a new JWT to be sent to the user
      const token = await createToken({ id: user._doc._id, email: user.email });
      return { token };
    })
    .then(res.success)
    .catch(() => {
      res.error({
        code: 401,
        type: 'a006',
        fields: Object.keys(req.body),
        message: 'invalidRefreshToken',
        display: 'error.invalidRefreshToken'
      });
    });
  }

  async function userManagementUserCreate(req, res) {
    // const { sendMail } = app.services.email;
    const session = await app.db.startSession();
    await session.startTransaction();

    const options = { new: true, setDefaultsOnInsert: true };
    return insertUser(req.body, options)
      .then(async (user) => {
        if (user !== null) {

          // User created successfully, we can commit Transaction
          await session.commitTransaction();
          // Then end the Mongoose session
          session.endSession();

          const { createResetToken } = app.helpers.user;

          const passwordResetToken = await createResetToken(24);
          const userUpdated = await updateUserService({ 
            params: { id: user._id },
            body: { reset_password_token: passwordResetToken } 
          });

          return res.success(userUpdated);

          // Construct mail text
          // const mailTemplate = app.templates.mailing.mailing({
          //   group: 'test',
          //   text: app.templates.mailing.textTemplate.userCreation(urlLink)
          // });

          // await updateResetPasswordToken(req.body.email, passwordResetToken);
          // sendMail({
          //   from: `${app.config.mailing.subject.Appname} <${app.config.mailing.email.from}>`,
          //   to: [ req.body.email ].join(', '),
          //   bcc: app.config.mailing.email.bcc,
          //   subject: '[Appname] Activer votre compte',
          //   html: mailTemplate
          // });
        } else {
          throw await app.helpers.reject({
            code: 400,
            type: 'err431',
            message: 'userServiceCreateUserExists',
            display: 'userManagement.error.createUserExists'
          });
        }
      })
      .catch(async (error) => {
        return res.error(error);
      });
  }


  async function verifyResetPasswordToken(req, res) {
    const { User } = app.models;
    if (!req.query.token) {
      return res.error({
        code: 401,
        type: 'err204',
        fields: req.body.token,
        data: req.body.token,
        message: 'undefinedToken',
        display: 'error.tokenInvalid'
      });
    }
    return User.findOne({
      reset_password_token: req.query.token,
      enabled: false
    })
      .catch((error) => {
        return app.helpers.reject({
          code: 401,
          type: 'err205',
          fields: req.body,
          data: req.body,
          message: 'noUserFoundWithResetToken',
          display: 'error.tokenInvalid',
          err: error.error
        });
      })
      .then(async (user) => {
        res.success({ success: true, userId: user.id });
      })
      .catch((error) => {
        res.error(error);
      });
  }

  function setResetPassword(req, res) {
    const { changePassword, removeResetPasswordToken } = app.services.user;

    const { password, confirmPassword, token } = req.body;

    const isPasswordTheSame = password === confirmPassword;
    if (!isPasswordTheSame && !token) {
      return res.error({
        code: 401,
        type: 'err206',
        fields: {
          token,
          isPasswordTheSame
        },
        data: {
          token,
          isPasswordTheSame
        },
        message: 'undefinedTokenOrPasswordUnmatch',
        display: 'error.tokenInvalid'
      });
    }

    return changePassword(password, token)
      .then(async () => {
        console.log('etape 2')
        await removeResetPasswordToken(token);
        res.success({ success: true });
      })
      .catch(res.error);
  }
}
