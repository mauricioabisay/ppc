var mongoose = require('mongoose');

var PropuestaSchema = new mongoose.Schema(
  {
    fecha:          { type: Date, default: Date.now },
    votos:          { type: Number, default: 0 },
    votos_detalle: [{ type: mongoose.Schema.Types.ObjectId, ref:'Usuario' }],
    //atendida:     { type: Boolean, default false },
    estado:         String,
    titulo:         String,
    autor:          String,
    autorId:        [{ type: mongoose.Schema.Types.ObjectId, ref:'Usuario' }],
    alcance:        String,
    impacto:        String,
    beneficiarios:  String,
    contexto:      String,
    categorias:     Array,
    comentarios:   [{ type: mongoose.Schema.Types.ObjectId, ref:'Comentario' }]
  }
);

mongoose.model('Propuesta', PropuestaSchema);
