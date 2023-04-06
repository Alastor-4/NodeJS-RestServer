const validarCampos = require("../middlewares/validar-campos.js");
const validarJWT = require("../middlewares/validar-jwt.js");
const validarRoles = require("../middlewares/validar-rol.js");

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validarRoles,
};
