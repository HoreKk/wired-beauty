module.exports = (app) => {
  const { createStudyService, getStudyById, updateStudyById, fetchAllStudies, uploadDatasetByStudyIdService, fetchDatasetByStudy, removeDatasetById, downloadDatasetById, getDatasetsByIds, removeStudyById } = app.services.study;
  return {
    createStudy,
    getStudy,
    updateStudy,
    findAllStudies,
    uploadDatasetByStudyId,
    getDatasetByStudyId,
    deleteDatasetById,
    downloadDataset,
    fetchDatasetsToJson,
    deleteStudyById
  }

  async function createStudy(req, res) {
    try {
      return createStudyService(req.body)
      .then((study) => {
        res.success(study);
      })
      .catch((error) => {
        res.error(error);
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Find Study by Id
  async function getStudy(req, res) {
    const { id } = req.params;
    try {
      return getStudyById(id)
      .then((study) => {
        res.success(study);
      })
      .catch((error) => {
        res.error(error);
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Find all studies
  async function findAllStudies(req, res) {
    const { id } = req.params;
    try {
      return fetchAllStudies(id)
      .then((study) => {
        res.success(study);
      })
      .catch((error) => {
        res.error(error);
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Update Study by Id
  async function updateStudy(req, res) {
    // Start a new session and transaction
    const session = await app.db.startSession();
    await session.startTransaction();

    const options = { session, new: false, setDefaultsOnInsert: true };
    try {
      // Update Study
      updateStudyById(req.body, options)
      .then(async (data) => {
            await session.commitTransaction();
            session.endSession();
            app.models.Study.findById({ "_id": req.params.id }).exec()
            .then(async (study) => {
              return res.success(study);
            })
            .catch((err) => {
              return app.helpers.reject({
                code: "500",
                type: "s004",
                message: "Couldn't update Study",
                display: "error.updateStudy",
                err
              });
            });
          })
        .catch(async (err) => {
        return res.error({
          code: "400",
          type: "a005",
          message: "Error updating study",
          display: "error.updateStudy",
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

  async function uploadDatasetByStudyId(req, res) {
    try {
      uploadDatasetByStudyIdService(req.params.id, req.files)
      .then(async (data) => {
          return res.success(data);
        })
        .catch(async (err) => {
          return res.error({
            code: "400",
            type: "a005",
            message: "Error updating study",
            display: "error.updateStudy",
            err: err.err
          });
      });
    } catch (error) {
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

  async function getDatasetByStudyId(req, res) {
    try {
      fetchDatasetByStudy(req.params.id)
      .then(async (data) => {
          return res.success(data);
        })
        .catch(async (err) => {
          return res.error({
            code: "400",
            type: "a005",
            message: "Error fetching files for study",
            display: "error.fetchDatasets",
            err: err.err
          });
      });
    } catch (error) {
      return res.error({
        code: "500",
        type: "a001",
        message: "Api loading error",
        display: "error.serverComponents",
        err: error
      });
    }
  }

  async function deleteStudyById(req, res) {
    try {
      removeStudyById(req.params.id)
      .then(async (data) => {
          return res.success(data);
        })
        .catch(async (err) => {
          return res.error({
            code: "400",
            type: "a005",
            message: "Error deleting study",
            display: "error.deleteStudy",
            err: err.err
          });
      });
    } catch (error) {
      return res.error({
        code: "500",
        type: "a001",
        message: "Api loading error",
        display: "error.serverComponents",
        err: error
      });
    }
  }

  async function deleteDatasetById(req, res) {
    try {
      removeDatasetById(req.params.id)
      .then(async (data) => {
          return res.success(data);
        })
        .catch(async (err) => {
          return res.error({
            code: "400",
            type: "a005",
            message: "Error deleting file",
            display: "error.deleteDataset",
            err: err.err
          });
      });
    } catch (error) {
      return res.error({
        code: "500",
        type: "a001",
        message: "Api loading error",
        display: "error.serverComponents",
        err: error
      });
    }
  }

  async function downloadDataset(req, res) {
    try {
      downloadDatasetById(req.params.id)
      .then(async (data) => {
          return res.download(data);
        })
        .catch(async (err) => {
          return res.error({
            code: "400",
            type: "a005",
            message: "Error downloading file",
            display: "error.downloadDataset",
            err: err.err
          });
      });
    } catch (error) {
      return res.error({
        code: "500",
        type: "a001",
        message: "Api loading error",
        display: "error.serverComponents",
        err: error
      });
    }
  }

  async function fetchDatasetsToJson(req, res) {
    try {
      getDatasetsByIds(req.body)
      .then(async (data) => {
          return res.success(data);
        })
        .catch(async (err) => {
          return res.error({
            code: "400",
            type: "a005",
            message: "Error loading datasets",
            display: "error.fetchDatasets",
            err: err.err
          });
      });
    } catch (error) {
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
