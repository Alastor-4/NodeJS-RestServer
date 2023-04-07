const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const path = require("path");
const fs = require("fs");

const cargarArchivos = async (req, res = response) => {
  try {
    //Imagenes, se quedan las extensiones por defecto
    const nombre = await subirArchivo(req.files);
    res.json({ nombre });
  } catch (msg) {
    return res.status(400).json({ msg });
  }
};

// const actualizarImagen = async (req, res = response) => {
//   const { id, coleccion } = req.params;

//   let modelo;
//   switch (coleccion) {
//     case "usuarios":
//       modelo = await Usuario.findById(id);
//       if (!modelo) {
//         return res
//           .status(400)
//           .json({ msg: `No existe un usuario con el Id ${id}` });
//       }
//       break;
//     case "productos":
//       modelo = await Producto.findById(id);
//       if (!modelo) {
//         return res
//           .status(400)
//           .json({ msg: `No existe un producto con el Id ${id}` });
//       }
//       break;
//     default:
//       return res.status(500).json({ msg: "Se me olvidó validar esto" });
//   }

//   if (modelo.img) {
//     const pathImagen = path.join(
//       __dirname,
//       "../uploads",
//       coleccion,
//       modelo.img
//     ); //para que borre la imagen cuando la reemplace
//     if (fs.existsSync(pathImagen)) {
//       fs.unlinkSync(pathImagen);
//     }
//   }
//   const nombre = await subirArchivo(req.files, undefined, coleccion);
//   modelo.img = nombre;

//   await modelo.save();
//   res.json(modelo);
// };

const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }
  // Limpiar imágenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1]; //obtener el nombre de la imagen
    const [public_id] = nombre.split("."); //obtener el nombre sin la extension, o id publico de cloudinary
    cloudinary.uploader.destroy(public_id); //con este método se borra la imagen anterior asociada
    //puede ser await pero tambien se deja como proceso aparte
  }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath); //con esto se sube la foto
  modelo.img = secure_url;
  await modelo.save();
  res.json(modelo);
};

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }
  // Limpiar imágenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  //si no tiene imagen
  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagen);
};

module.exports = {
  cargarArchivos,
  // actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
};
