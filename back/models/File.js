module.exports = (app) => {
  var mongoose = require('mongoose');
  
  var fileSchema = new mongoose.Schema({
    name: String,
    study_id: String,
    size: Number,
    path: String,
  });
  const File = mongoose.model('File', fileSchema);
  app.models = {
    ...app.models,
    File
  };
}
