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

router.post('/representantesPropuesta', function (req, res, next) {
  var propuesta = req.body.propuesta;
  var len = propuesta.categorias.length;
  var queryCategorias = new Array();

  for(var i = 0; i < len; i++) {
    queryCategorias.push({
      categorias:{ $elemMatch:{
        categoria: propuesta.categorias[i],
        alcance: propuesta.alcance
      }}
    });
  }

  queryRepresentante = {
    $and:[
      {representante: true},
      {$or: queryCategorias}
    ]
  };
  if(queryCategorias.length > 0) {
    Usuario.find(queryRepresentante, function (err, data) {
      if(err) {return next(err)}
      res.json(data);
    });
  } else {
    res.json([]);
  }
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
