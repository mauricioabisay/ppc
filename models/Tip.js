var mongoose = require('mongoose');

var TipSchema = new mongoose.Schema(
  {
    contenido: String
  }
);

mongoose.model('Tip', TipSchema);
