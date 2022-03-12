module.exports = (app) => {
  const xlsx = require('node-xlsx');
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
    downloadDatasetById,
    getDatasetsByIds
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

  async function getDatasetsByIds(params) {
    const XLSX = require('xlsx');
    try {
      const files = await File.find({ _id: params.map(f => f._id) });
      if (!files) return [];
      let sheets = [];
      files.map(async (file) => {
        const dirPath = path.resolve(__dirname, '../uploads');
        const newPath = path.join(dirPath, file.name);
        var workbook = XLSX.readFile(newPath);
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function(y) {
          var worksheet = workbook.Sheets[y];
          var headers = {};
          var data = [];
          for(z in worksheet) {
            if(z[0] === '!') continue;
            //parse out the column, row, and value
            var tt = 0;
            for (var i = 0; i < z.length; i++) {
              if (!isNaN(z[i])) {
                tt = i;
                break;
              }
            };
            var col = z.substring(0,tt);
            var row = parseInt(z.substring(tt));
            var value = worksheet[z].v;

            //store header names
            if(row == 1 && value) {
              headers[col] = value;
              continue;
            }

            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
          }
          //drop those first two rows which are empty
          data.shift();
          data.shift();
          sheets.push({ name: y, data: data });
        });
      });
      return sheets;
    } catch (e) {
      console.log(e)
    }
  }

}
