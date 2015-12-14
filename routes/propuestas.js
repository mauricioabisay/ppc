var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var mongoose = require('mongoose');
var Propuesta = mongoose.model('Propuesta');
var Comentario = mongoose.model('Comentario');
var Usuario = mongoose.model('Usuario');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mauricioabisay.lopez@gmail.com',
        pass: 'm08A%11lv'
    }
});

router.post('/', function (req, res, next) {
  req.body.votos_detalle = [req.body.autorId];
  req.body.votos = 1;
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

router.put('/apoyar/:id', function (req, res, next) {
  Propuesta.find( {
    $and: [
      {_id: req.params.id},
      {votos_detalle: {$in:[req.body.usuario]}}
    ]
  }, function (err, propuesta) {
    if(err) {return next(err);}
    if(propuesta.length > 0) {
      return next(new Error('Ya has votado por esta propuesta.'));
    } else {
      req.body.votos = req.body.votos + 1;
      req.body.votos_detalle.push(req.body.usuario);
      delete req.body.usuario;
      Propuesta.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true},
        function (err, propuesta) {
          if(err) {return next(err);}
          if(!propuesta) {return next(new Error('Lo siento, no he podido encontrar la propuesta.'));}

          if(
            ( (propuesta.votos > 1) && (propuesta.alcance=='Local')    ) ||
            ( (propuesta.votos > 2) && (propuesta.alcance=='Estatal')  ) ||
            ( (propuesta.votos > 3) && (propuesta.alcance=='Nacional') )
          ) {
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
            Usuario.find(queryRepresentante, function (err, data) {
              if(err) {return next(err)};
              if( (!err) && (data) && (data.length > 0) ) {
                var mailOptions = {
                    from: 'MiPropuesta ✔ <contacto@mipropuesta.mx>',
                    to: data[0].email,
                    subject: propuesta.titulo + ' ha alcanzado votación para ser atendida',
                    html:
                    '<h1 style="color:#ff00ff;font-size:1.3em;font-weight:700">'+propuesta.titulo+'</h1>'+
                    '<p style="color:#0000ff;font-size:1.3em;font-weight:500"><b>Votos:</b>&nbsp;'+
                    propuesta.votos+'</p>'+
                    '<p style="color:#0000ff;font-size:1.3em;font-weight:500"><b>Autor:</b>&nbsp;'+
                    propuesta.autor+'</p>'+
                    '<p style="color:#0000ff;font-size:1.3em;font-weight:500"><b>Descripción:</b></p>'+
                    '<p>'+propuesta.alcance+'</p>'+
                    '<p style="color:#0000ff;font-size:1.3em;font-weight:500"><b>Impacto:</b></p>'+
                    '<p>'+propuesta.impacto+'</p>'+
                    '<p style="color:#0000ff;font-size:1.3em;font-weight:500"><b>Beneficiarios:</b></p>'+
                    '<p>'+propuesta.beneficiarios+'</p>'+
                    '<p style="color:#0000ff;font-size:1.3em;font-weight:500"><b>Contexto:</b></p>'+
                    '<p>'+propuesta.contexto+'</p>'
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if(error){return next(error);}
                  console.log('Message sent: ' + info.response);
                });
              }
            });
            res.json(propuesta);
          }

        }
      );
    }
  } );
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
