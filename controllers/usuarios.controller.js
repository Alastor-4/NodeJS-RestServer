const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "Sin nombre", apikey } = req.query;
  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
  });
};

const usuariosPut = (req = request, res) => {
  const { id } = req.params;
  res.json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPost = (req, res) => {
  const body = req.body; //asi se extrae la respuesta, tambien se puede desestructurar
  res.json({
    msg: "post API - controlador",
    body,
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
