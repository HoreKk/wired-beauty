const { Router } = require('express');

module.exports = (app) => {
  const { ensureAuthenticated, multer } = app.middlewares;
  const router = new Router();
  const path = require('path');

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (path.extname(file.originalname) !== ('.xlsx' || '.csv')) {
        return cb(new Error('Only xlsx or csv files are allowed'))
      }
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  var upload = multer({ storage: storage });

  const { createStudy, getStudy, updateStudy, findAllStudies, uploadDatasetByStudyId, getDatasetByStudyId, deleteDatasetById, downloadDataset, fetchDatasetsToJson, deleteStudyById } = app.action.study;
  
  // Create a new study
  router.post('/create',
    ensureAuthenticated,
    createStudy
  );

  // Find all Studies
  router.get('/studies',
    ensureAuthenticated,
    findAllStudies
  )

  // Upload dataset for a study
  router.post('/upload-dataset/:id',
    upload.any('dataset'),
    ensureAuthenticated,
    uploadDatasetByStudyId
  );

  // Get all dataset for a study
  router.get('/datasets/:id',
    ensureAuthenticated,
    getDatasetByStudyId
  );

  router.get('/dataset/:id/download',
    ensureAuthenticated,
    downloadDataset
  );

  router.delete('/dataset/:id',
    ensureAuthenticated,
    deleteDatasetById
  );

  router.delete('/studies/:id',
    ensureAuthenticated,
    deleteStudyById
  );

  // Find study by id
  router.get('/:id',
    ensureAuthenticated,
    getStudy
  )
  
  // Update study by id
  router.post('/:id',
    ensureAuthenticated,
    updateStudy
  );

  router.post('/report/datasets',
    ensureAuthenticated,
    fetchDatasetsToJson
  );

  return router;
}
