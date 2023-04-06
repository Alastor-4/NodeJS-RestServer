const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
  obtenerProducto,
} = require("../controllers/productos.controller");

const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const {
  validarJWT,
  validarCampos,
  validarRolAdmin,
} = require("../middlewares");

const router = Router();

//Obtener todos los productos
router.get("/", obtenerProductos);

//Obtener un producto por id
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoria),
    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [validarJWT, check("id").custom(existeProducto), validarCampos],
  actualizarProducto
);

//Borrar, solo si es admin
router.delete(
  "/:id",
  [
    validarJWT,
    validarRolAdmin,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
