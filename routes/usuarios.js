//https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04
//https://www.digitalocean.com/community/questions/mysql-server-keeps-stopping-unexpectedly

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

router.get('/', function (req, res, next) {
  Usuario.find({}, function (err, data) {
    if(err) {return next(err);}
    res.json(data);
  });
});

router.post('/search', function (req, res, next) {
  Usuario.find(req.body.search, function (err, data) {
    if(err) {return next(err);}
    res.json(data);
  });
});

router.post('/', function (req, res, next) {
  var usuario = new Usuario(req.body);
  usuario.save(function (err, data) {
    if(err) {return next(err);}
    if(!data) {res.json(null);}
    res.json(data);
  });
});

router.post('/auth', function (req, res, next) {
  Usuario.findOne(req.body, function (err, data) {
    if(err) {return next(err);}
    if(!data) {return res.json(null);}
    res.json(data);
  });
});

module.exports = router;
