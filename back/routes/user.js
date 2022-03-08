const { Router } = require('express');

module.exports = (app) => {
  const { ensureAuthenticated } = app.middlewares;
  const router = new Router();

  const { findUserById, updateUser } = app.action.user;
  
  // Find User by id
  router.get('/:id',
    ensureAuthenticated,
    findUserById
  )
  
  // Update User by id
  router.put('/update/:id',
    updateUser
  );

  return router;
}
