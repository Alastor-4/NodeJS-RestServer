const { Schema, model } = require("mongoose");

//Crear el schema del usuario o modelo
const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  imagen: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  //sobreescribir el toJSON para extraer valores de la respuesta
  const { __v, password, ...user } = this.toObject();
  return user;
};

//esta es la forma de exportar un modelo con su esquema
module.exports = model("Usuario", UsuarioSchema);
