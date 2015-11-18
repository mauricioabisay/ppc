var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    nombre: String,
    mujer: Boolean,
    nacimiento: Date,
    estado: String,
    localidad: String,
    ciudadano: {type: Boolean, default: true},
    funcionario: Boolean,
    administrador: {type: Boolean, default: false},
    categorias: [{categoria: String, alcance: String}]
  }
);

mongoose.model('Usuario', UsuarioSchema);
