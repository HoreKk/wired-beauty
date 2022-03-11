module.exports = (app) => {
  const path = require('path');
  const { Study, File } = app.models;
  return {
    createStudyService,
    getStudyById,
    updateStudyById,
    fetchAllStudies,
    uploadDatasetByStudyIdService,
    fetchDatasetByStudy,
    removeDatasetById,
    downloadDatasetById
  };

  // Find Study by id
  function createStudyService(body) {
    return Study.create(
      { ...body }
      )
      .then((result) => {
        return result;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s001",
        message: "Study could not be created",
        display: "error.createStudy",
        error
      });
    });
  }

  // Find Study by id
  function getStudyById(id) {
    return Study.findOne(
      { _id: id }
      ).exec()
      .then((result) => {
        return result;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s001",
        message: "Study could not be created",
        display: "error.createStudy",
        error
      });
    });
  }

  // Find all Studies
  function fetchAllStudies() {
    return Study.find(
      { enabled: true }
      ).exec()
      .then((result) => {
        return result;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s001",
        message: "Study could not be found",
        display: "error.fetchAllStudies",
        error
      });
    });
  }

  // Find all files for a Study
  function fetchDatasetByStudy(study_id) {
    return File.find(
      { study_id }
      ).exec()
      .then((result) => {
        return result;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s001",
        message: "Study files could not be found",
        display: "error.fetchAllFilesForStudies",
        error
      });
    });
  }

  // Update study by id
  function updateStudyById(params) {
    return Study.updateOne({ _id: params._id },
      { ...params }
      ).exec()
      .then((result) => {
      return result;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s001",
        message: "Study could not be found",
        display: "error.updateStudy",
        error
      });
    });
  }

  // Update study by id
  function uploadDatasetByStudyIdService(study_id, params) {
    return File.create(
      {
        study_id,
        name: params[0].originalname,
        size: params[0].size,
        path: params[0].path,
      }
      )
      .then((result) => {
      return result;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s001",
        message: "Dataset could not be uploaded",
        display: "error.uploadDataset",
        error
      });
    });
  }

  // Delete dataset by id
  function removeDatasetById(_id) {
    return File.deleteOne({  _id })
      .then((result) => {
      return result;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s001",
        message: "Dataset could not be deleted",
        display: "error.deleteDataset",
        error
      });
    });
  }

  // Download dataset by id
  async function downloadDatasetById(_id) {
    try {
      const file = await File.findOne({ _id });
      const dirPath = path.resolve(__dirname, '../uploads');
      const newPath = path.join(dirPath, file.name);
      return newPath;
    } catch (e) {
      console.log(e)
    }
  }

}
