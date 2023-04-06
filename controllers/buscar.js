const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = isValidObjectId(termino);

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({ results: usuario ? [usuario] : [] });
  }

  const regexp = new RegExp(termino, "i"); //expresion regular

  const usuarios = await Usuario.find({
    $or: [{ nombre: regexp }, { correo: regexp }],
    $and: [{ estado: true }],
  });
  return res.json({ results: usuarios });
};
const buscarCategorias = async (termino = "", res = response) => {
  const esMongoId = isValidObjectId(termino);

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({ results: categoria ? [categoria] : [] });
  }

  const regexp = new RegExp(termino, "i"); //expresion regular

  const categorias = await Categoria.find({ nombre: regexp, estado: true });
  return res.json({ results: categorias });
};
const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = isValidObjectId(termino);

  if (esMongoId) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    ); //para agregarle el populate y tenga mas datos

    return res.json({ results: producto ? [producto] : [] });
  }

  const regexp = new RegExp(termino, "i"); //expresion regular

  const productos = await Producto.find({
    nombre: regexp,
    estado: true,
  }).populate("categoria", "nombre");

  return res.json({ results: productos });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    res.status(400).json({
      msg: `Las colecciones permitidas son : ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    case "roles":
      break;

    default:
      res.status(500).json({ msg: "Error backend" });
  }

  // res.json({ coleccion, termino });
};

module.exports = { buscar };
