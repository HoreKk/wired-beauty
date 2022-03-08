const express = require('express');
require('dotenv').config({
  path:'.env'
});

// Setup the main express app server
const app = express();
require('./boot')(app);
require('./config')(app);
require('./helpers')(app);
require('./middlewares')(app);
require('./models')(app);
require('./services')(app);
require('./actions')(app);
require('./routes')(app);

app.boot(app.config.port, app.config.host);
