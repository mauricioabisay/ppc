var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Categoria = mongoose.model('Categoria');

router.get('/', function (req, res, next) {
  Categoria.find(function (err, data) {
    if(err) {return next(err);}
    res.json(data);
  });
});

router.post('/', function (req, res, next) {
  var categoria = new Categoria(req.body);
  categoria.save(function (err, categoria) {
    if(err) {return next(err);}
    Categoria.find(function (err, data) {
      if(err) {return next(err);}
      res.json(data);
    });
  });
});

router.delete('/:id', function (req, res, next) {
  Categoria.findByIdAndRemove(req.params.id, function (err) {
    if(err) {return next(err);}
    res.json({message: 'Categoria eliminada.'});
  });
});

module.exports = router;
