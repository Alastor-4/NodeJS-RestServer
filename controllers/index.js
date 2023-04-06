const login = require("../controllers/auth.controller");
const categorias = require("../controllers/categorias.controller");
const usuarios = require("../controllers/usuarios.controller");
const productos = require("../controllers/productos.controller");

module.exports = {
  ...login,
  ...categorias,
  ...usuarios,
  ...productos,
};
