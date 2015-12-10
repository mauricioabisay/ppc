var mongoose = require('mongoose');

var RepresentanteSchema = new mongoose.Schema(
  {
    email:                  String,
    nombre:                 String,
    localidad:              String,
    estado:                 String,
    
  }
);

mongoose.model('Representante', RepresentanteSchema);
