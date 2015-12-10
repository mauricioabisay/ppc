var mongoose = require('mongoose');

var ComentarioSchema = new mongoose.Schema(
  {
    contenido: String,
    autor: String,
    propuesta: { type: mongoose.Schema.Types.ObjectId, ref: 'Propuesta' }
  }
);

mongoose.model('Comentario', ComentarioSchema);
