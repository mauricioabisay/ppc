var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

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
