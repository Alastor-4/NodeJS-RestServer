const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.js");

const validarJWT = async (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //extrae el uid a la hora de crear el token
    const usuario = await Usuario.findById(uid); //se busca el usuario por el uid

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - Usuario no existe en DB",
      });
    }
    //Verificar si el uid esta marcado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - Usuario con estado false",
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = { validarJWT };
