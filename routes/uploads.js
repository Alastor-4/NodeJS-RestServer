const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivos,
  // actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarArchivosSubir } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", validarArchivosSubir, cargarArchivos);

router.put(
  "/:coleccion/:id",
  [
    validarArchivosSubir,
    check("id", "El id debe ser un Id de Mongo").isMongoId(),
    check("coleccion").custom((coleccion) =>
      coleccionesPermitidas(coleccion, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);

module.exports = router;
