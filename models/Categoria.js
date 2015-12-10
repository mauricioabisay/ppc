var mongoose = require('mongoose');

var CategoriaSchema = new mongoose.Schema(
  {
    titulo: String
  }
);

mongoose.model('Categoria', CategoriaSchema);
