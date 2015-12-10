var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/**
DB AND MODELS
*/
require('./models/Usuario.js');
require('./models/Propuesta.js');
require('./models/Comentario.js');
require('./models/Categoria.js');
require('./models/Tip.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ppc');
//Routes
var routes = require('./routes/index');
var users = require('./routes/users');
var usuarios = require('./routes/usuarios');
var propuestas = require('./routes/propuestas');
var categorias = require('./routes/categorias');
var tips = require('./routes/tips');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/js', express.static(__dirname + '/views/js'));
app.use('/css', express.static(__dirname + '/views/css'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/partials', express.static(__dirname +  '/views/partials'));
/**
ROUTES
*/
//app.use('/', routes);
app.get('/', function(req, res) {
 res.sendFile('/views/index.html', {root: __dirname});
});
app.use('/users', users);
app.use('/usuarios', usuarios);
app.use('/propuestas', propuestas);
app.use('/categorias', categorias);
app.use('/tips', tips);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
