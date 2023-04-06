const { response } = require("express");

const validarRolAdmin = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "No hay token validado",
    });
  }
  const { rol, nombre } = req.usuario;
  if (rol != "Admin_Rol") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }

  next();
};

const esRol = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "No hay token validado",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El usuario ${req.usuario.nombre} no tiene permisos para realizar esta operación`,
      });
    }
    next();
  };
};

module.exports = { validarRolAdmin, esRol };
