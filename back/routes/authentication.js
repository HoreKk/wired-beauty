const { Router } = require('express');
module.exports = (app) => {
  const { login, register, refreshToken, accessToken, userManagementUserCreate, verifyResetPasswordToken, setResetPassword } = app.action.authentication;
  const router = new Router();

  // Login
  router.post('/login',
    login
  );
  
  // Register
  router.post('/register',
    register
  );

  // Refresh token - used when changing password for example
  router.post('/new/refreshToken',
    app.middlewares.ensureValidJwt,
    refreshToken
  );

  // send new access token - used when changing password for example
  router.post('/new/token',
    accessToken
  );

  router.post('/security/request-password-reset',
    // ensureFields([
    //   { field: 'email', validations: [ 'isEmail' ], mandatory: true },
    // ]),
    userManagementUserCreate
  );

  router.get('/security/verify-token', verifyResetPasswordToken);

  router.post('/security/reset-password', setResetPassword);

  return router;
}
