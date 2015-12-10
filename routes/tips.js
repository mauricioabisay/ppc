var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Tip = mongoose.model('Tip');

router.get('/', function (req, res, next) {
  Tip.find(function (err, data) {
    if(err) {return next(err);}
    res.json(data);
  });
});

router.get('/random', function (req, res, next) {
  Tip.findOneRandom(function (err, data) {
    if(err) {return next(err);}
    res.json(data);
  });
});

router.post('/', function (req, res, next) {
  var tip = new Tip(req.body);
  tip.save(function (err) {
    if(err) {return next(err, tip);}
    res.json(tip);
  });
});

router.delete('/:id', function (req, res, next) {
  Tip.findByIdAndRemove(req.params.id, function (err) {
    if(err) {return next(err);}
    res.json({message: 'Tip eliminado.'});
  });
});

module.exports = router;
