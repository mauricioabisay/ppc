var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Propuesta = mongoose.model('Propuesta');
var Comentario = mongoose.model('Comentario');

router.post('/', function (req, res, next) {
  var propuesta = new Propuesta(req.body);
  propuesta.save(function (err, propuesta) {
    if(err) {return next(err);}
    res.json(propuesta);
  });
});

router.post('/:id/comentarios', function (req, res, next) {
  Propuesta.findById(req.params.id, function (err, propuesta) {
    if(err) {return next(err);}
    if(!propuesta) {return next(new Error('Lo siento, no he podido encontrar la propuesta.'));}
    var comentario = new Comentario(req.body);
    comentario.post = propuesta;
    comentario.save(function (err, comentario) {
      if(err) {return next(err);}
      propuesta.comentarios.push(comentario);
      propuesta.save(function (err, data) {
        if(err) {return next(err);}
        res.json(comentario);
      });
    });
  });
});

router.get('/', function(req, res, next) {
  Propuesta.find({ $query:{}, $orderby: {votos:-1} }, function (err, data) {
    if(err) {return next(err);}
    res.json(data);
  });
});

router.get('/:id', function (req, res, next) {
  Propuesta.findById(req.params.id, function (err, propuesta) {
    if(err) {return next(err);}
    if(!propuesta) {return next(new Error('Lo siento, no he podido encontrar la propuesta.'));}
    propuesta.populate('comentarios', function (err, data) {
      if(err) {return next(err);}
      res.json(data);
    });
  });
});

router.get('/searchByTitle/:titulo', function (req, res, next) {
  var aux = req.params.titulo.split(" ");
  var len = aux.length;
  var or = new Array();

  for(var i = 0; i < len; i++) {
    or.push({"titulo": new RegExp('\\w*' + aux[i] + '{1,}\\w*', 'i')});
  }

  Propuesta.find({$or: or}, function (err, data) {
    if(err) {return next(err);}
    if(!data) {res.json([]);}
    res.json(data);
  });
});

router.post('/searchFilter/', function (req, res, next) {
  Propuesta.find({$query: req.body, $orderby: {votos:-1}}, function (err, data) {
    if(err) {return next(err);}
    if(!data) {return res.json(null);}
    res.json(data);
  });
});

router.post('/searchTop/', function (req, res, next) {
  Propuesta.findOne({$query: req.body, $orderby: {votos:-1}}, function (err, data) {
    if(err) {return next(err);}
    if(!data) {return res.json(null);}
    res.json(data);
  });
});

router.get('/searchTopTen/:alcance', function (req, res, next) {
  if(req.params.alcance=='ALL') {
    Propuesta.find(
      {$query: {atendida: {$in: [null, false]}}, $orderby: {votos:-1}},
      null,
      {limit: 10},
      function (err, data) {
        if(err) {return next(err);}
        if(!data) {return res.json(null);}
        res.json(data);
      }
    );
  } else {
    Propuesta.find(
      {$query:
        {$and: [
          {atendida: {$in: [null, false]}},
          {alcance:req.params.alcance}
        ]},
        $orderby: {votos:-1}
      },
      null,
      {limit: 10},
      function (err, data) {
        if(err) {return next(err);}
        if(!data) {return res.json(null);}
        res.json(data);
      }
    );
  }

});

router.put('/:id', function (req, res, next) {
  Propuesta.findByIdAndUpdate(
    req.params.id,
    {$set: req.body},
    {new: true},
    function (err, propuesta) {
      if(err) {return next(err);}
      if(!propuesta) {return next(new Error('Lo siento, no he podido encontrar la propuesta.'));}
      res.json(propuesta);
    }
  );
});

router.delete('/:id', function (req, res, next) {
  Propuesta.findByIdAndRemove(req.params.id, {}, function (err, propuesta) {
    if(err) {return next(err);}
    res.json({message: 'Propuesta eliminada.'})
  })
});
/*
router.param('propuesta', function (req, res, next, id) {
  var query = Propuesta.findById(id);
  query.exec(function (err, propuesta) {
    if(err) {return next(err);}
    if(!propuesta) {return next(new Error('Lo siento, no he podido encontrar la propuesta.'));}
    req.propuesta = propuesta;
    return next();
  });
});
*/
module.exports = router;
