const { Usuario, Role, Categoria, Producto } = require("../models/index.js");

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

const existeCategoria = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id: ${id} no existe`);
  }
};

const existeProducto = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id: ${id} no existe`);
  }
};

const coleccionesPermitidas = (coleccion = "", coleccionesPermitidas = []) => {
  const incluida = coleccionesPermitidas.includes(coleccion);
  if (!incluida) {
    throw new Error(`La colección ${coleccion} no es permitida`);
  }
  return true;
};

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorID,
  existeCategoria,
  existeProducto,
  coleccionesPermitidas,
};
