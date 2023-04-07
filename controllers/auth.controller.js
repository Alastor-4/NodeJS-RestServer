const { response } = require("express");
const { Usuario } = require("../models");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generar-jwt.js");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Si el usuario existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      res.status(400).json({ msg: "El correo no es correcto" });
    }
    //Si el usuario esta activo en la bd
    if (!usuario.estado) {
      res.status(400).json({ msg: "El estado es falso" });
    }
    //Comprobar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      res.status(400).json({ msg: "La contraseña no es correcta" });
    }
    //Generar JWT
    const token = await generateJWT(usuario.id);
    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Algo salió mal" });
  }
};

module.exports = { login };
