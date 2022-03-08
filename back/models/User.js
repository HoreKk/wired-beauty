module.exports = (app) => {
  const mongoose = require('mongoose');
  const rounds = app.config.auth.users.saltRounds;
  const bcrypt = require('bcrypt');

  const UserSchema = new mongoose.Schema({
    // 	the user's id, unique
    _id: {
      type: Number
    },
    // the user's firstname, not unique across the platform
    firstname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    // the user's lastname, not unique across the platform
    lastname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    // the user's chosen language option
    locale: {
      type: String
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1
    },
    // user's password
    password: {
      type: String,
      required: true,
      minlength:8,
      maxlength: 255,
      // select: false,
    },
    // password reset token
    reset_password_token: {
      type: String
    },
    // token for authentication
    token: {
      type: String
    },
    // refresh token for authentication
    refresh_token: {
      type: String
    },
    // refresh token for authentication
    last_login: {
      type: Date
    },
    // When the user has been created at
    created_at: {
      type: Date
    },
    // the last time the user was updated
    updated_at: {
      type: Date
    },
    // the type of account for permissions management
    type: {
      type: Number
    },
    // if user's account has been deactivated (soft delete) not deleted
    enabled: {
      type: Boolean,
      default: true
    }
  });

  // Hash and Save password
  UserSchema.pre('save', function (next) {
    const user = this;
    const password = this.password;
    if (!password) {
      return next();
    }
    try {
      const salt = bcrypt.genSaltSync(rounds);
      const hash = bcrypt.hashSync(password, salt);
      this.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
    user.created_at = new Date();
    user.type = 0;
    user.enabled = true;
    next();
  });

  // Update password if set
  UserSchema.pre('updateOne', async function (next) {
    this.set({ updated_at: new Date() });
    const password = this.getUpdate().password;
    if (!password) {
      return next();
    }
    try {
      const salt = bcrypt.genSaltSync(rounds);
      const hash = bcrypt.hashSync(password, salt);
      this.getUpdate().password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  });

  const User = mongoose.model('Users', UserSchema);
  app.models = {
    User
  };
}