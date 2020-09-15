
require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors = require("cors");
const session       = require('express-session');
const passport      = require('passport');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

require('./configs/passport');
require('./configs/db')



const app = express();

// SESSION SETTINGS 
const createSession = require('./configs/session');
createSession(app);

//PASSPORT initialize & session
app.use(passport.initialize());
app.use(passport.session());


// Middleware Setup

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));





// default value for title local
app.locals.title = 'AppStudent';
//CORS
app.use(cors({
  credentials: true,
  origin: [ "http://localhost:3000", "http://localhost:3001", "https://studentsfp.herokuapp.com/" ]
}));


const index = require('./routes/index');

app.use('/api/', index);
app.use('/api/', require('./routes/file-upload'));

const authRoutes = require('./routes/auth-routes');
app.use('/api/', authRoutes);
const jobRoutes = require('./routes/job-routes');
app.use('/api/', jobRoutes);

const businessRoutes = require('./routes/business-routes')
app.use('/api', businessRoutes)

module.exports = app;
