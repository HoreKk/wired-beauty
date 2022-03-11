module.exports = (app) => {
  const mongoose = require('mongoose');

  const StudySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 500
    },
    start_date: {
      type: Date
    },
    end_date: {
      type: Date
    },
    sampleSize: {
      type: Number
    },
    enabled: {
      type: Boolean,
      default: true
    }
  });

  StudySchema.pre('save', function (next) {
    const study = this;
    next();
  });

  const Study = mongoose.model('Study', StudySchema);
  app.models = {
    ...app.models,
    Study
  };
}