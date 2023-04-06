const { response } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(+desde)
      .limit(+limite),
  ]);

  res.json({
    total,
    categorias,
  });
};

//obtener categoria - populate {}
const obtenerCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json(categoria);
};
const crearCategoria = async (req, res = response) => {
  try {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
      res
        .status(400)
        .json({ msg: `La categoria ${categoriaDB.nombre} ya está registrada` });
    }

    // Generar la data a guardar
    const data = {
      nombre,
      usuario: req.usuario._id,
    };

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();
    res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
  }
};

//actualizar categoria
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

//borrar categoria - estado a false
const borrarCategoria = async (req, res) => {
  const { id } = req.params;

  const catagoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    { new: true }
  );

  res.json(catagoriaBorrada);
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};
