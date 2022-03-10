const { Router } = require('express');

module.exports = (app) => {
  const { ensureAuthenticated } = app.middlewares;
  const router = new Router();

  const { findUserById, findUsers, countUsers, updateUser } = app.action.user;
  
  
  // Count Users
  router.get('/count',
  countUsers
  )
  
  // Find Users with pagination
  router.get('/',
  findUsers
  )
  
  // Update User by id
  router.put('/update/:id',
  updateUser
  );
  
  // Find User by id
  router.get('/:id',
    ensureAuthenticated,
    findUserById
  )
  
  return router;
}
