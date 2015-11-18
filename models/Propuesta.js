var mongoose = require('mongoose');

var PropuestaSchema = new mongoose.Schema(
  {
    fecha:        { type: Date, default: Date.now },
    votos:        { type: Number, default: 0 },
    estado:         String,
    titulo:         String,
    autor:          String,
    alcance:        String,
    impacto:        String,
    beneficiarios:  String,
    ubicacion:      String,
    categorias:     Array,
    comentarios:[ { type: mongoose.Schema.Types.ObjectId, ref:'Comentario' } ]
  }
);

mongoose.model('Propuesta', PropuestaSchema);
