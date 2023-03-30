const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    //Lectura y parse del body
    this.app.use(express.json());

    //Directorio público, sale al abrir  la app
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Corriendo en el puerto http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
