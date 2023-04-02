const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    console.log("Conectando DB......", process.env.MONGODB_CNN);

    //para conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de Datos conectada");
  } catch (error) {
    console.error(error);
    throw new Error("Error al conectar con la base de Datos");
  }
};

module.exports = {
  dbConnection,
};
