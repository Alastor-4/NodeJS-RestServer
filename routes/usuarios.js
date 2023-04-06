const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT, esRol } = require("../middlewares");

const {
  esRolValido,
  existeEmail,
  existeUsuarioPorID,
} = require("../helpers/db-validators.js");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  //validaciones con check
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(existeEmail),
    check("password", "El password debe tener más de 6 letras").isLength({
      min: 6,
    }),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    esRol("Admin_Rol", "Ventas_Rol"),
    // validarRolAdmin,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
