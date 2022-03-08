module.exports = (app) => {
  const { findById, updateUserService } = app.services.user;
  return {
    findUserById,
    updateUser
  }

  // Find User by Id
  async function findUserById(req, res) {
    const { id } = req.params;

    return findById(id)
    .then(app.helpers.ensureOne)
    .then((user) => {
      res.success(user);
    })
    .catch((error) => {
      res.error(error);
    });
  }

  // Update User by Id
  async function updateUser(req, res) {
    // Start a new session and transaction
    const session = await app.db.startSession();
    await session.startTransaction();

    const options = { session, new: false, setDefaultsOnInsert: true };
    try {
        // Update User
      updateUserService(req, options)
        .then(async (data) => {
            // User updated successfully, we can commit Transaction
            await session.commitTransaction();
            // Then end the Mongoose session
            session.endSession();
            app.models.User.findById({ "_id": req.params.id }).exec()
            .then(async (user) => {
              return res.success(user);
            })
            .catch((err) => {
              return app.helpers.reject({
                code: "500",
                type: "s004",
                message: "Couldn't update User",
                display: "error.updateUser",
                err
              });
            });
          })
        .catch(async (err) => {
        // Return error is there was an issue with findById
        return res.error({
          code: "400",
          type: "a005",
          message: "Error updating User",
          display: "error.updateUser",
          err: err.err
        });
      });
    } catch (error) {
      // If an error is catched abort the Transaction
      await session.abortTransaction();
      // Then end the Mongoose session
      session.endSession();
      // If a component couldn't load we throw an error
      return res.error({
        code: "500",
        type: "a001",
        message: "Api loading error",
        display: "error.serverComponents",
        err: error
      });
    }
  }
}
