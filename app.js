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

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(cors({
  credentials: true,
  origin: [ "http://localhost:3000", "https://studentsfp.herokuapp.com/" ]
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//DEPLOY/////
app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});



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

// SESSION SETTINGS 
app.use(session({
  secret:"myPetAppWP",
  resave: true,
  saveUninitialized: true
}));

//PASSPORT initialize & session
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Students App';



const index = require('./routes/index');
app.use('/', index);

const upload = require('./routes/file-upload')
app.use('/', upload)

const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);

const jobRoutes = require('./routes/job-routes');
app.use('/', jobRoutes);

const businessRoutes = require('./routes/business-routes')
app.use('/', businessRoutes)

module.exports = app;

