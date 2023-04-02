const { request, response } = require("express");
const Usuario = require("../models/usuario.js");
const bcryptjs = require("bcryptjs");

//GET:
const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "Sin nombre", apikey } = req.query;
  const { limit = 5, desde = 0 } = req.query; //se extrae de la request
  const [usuarios, total] = await Promise.all([
    Usuario.find({ estado: true }).skip(+desde).limit(+limit),
    Usuario.countDocuments({ estado: true }),
  ]);
  res.json({ usuarios, total }); //asi tan ez
};

//PUT:
const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync(); //cantidad de vueltas que da para encriptar
    resto.password = bcryptjs.hashSync(password, salt); //la encripta y la guarda en usuario.password
  }

  const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - controlador",
    usuarioDB,
  });
};

//POST:
const usuariosPost = async (req, res = response) => {
  const { nombre, password, correo, rol } = req.body; //asi se extrae la respuesta, tambien se puede desestructurar
  const usuario = new Usuario({ nombre, password, correo, rol }); //aqui se pasa con llaves

  //Verificar si el correo existe

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(); //cantidad de vueltas que da para encriptar
  usuario.password = bcryptjs.hashSync(password, salt); //la encripta y la guarda en usuario.password

  await usuario.save();

  res.json({
    usuario,
  });
};

//DELETE:
const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  //forma de borrar sin borrar, solo cambiar el estado a false
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
