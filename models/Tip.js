var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var TipSchema = new mongoose.Schema(
  {
    contenido: String
  }
);

TipSchema.plugin(random);

mongoose.model('Tip', TipSchema);
