const Role = require("../models/role.js");
const Usuario = require("../models/usuario.js");

const esRolValido = async (rol = " ") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const existeEmail = async (correo = " ") => {
  const email = await Usuario.findOne({ correo });
  if (email) {
    throw new Error(`El correo: ${correo} ya existe`);
  }
};
const existeUsuarioPorID = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id: ${id} no existe`);
  }
};

module.exports = { esRolValido, existeEmail, existeUsuarioPorID };
