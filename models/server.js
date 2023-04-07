const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      authPath: "/api/auth",
      buscar: "/api/buscar",
      productosPath: "/api/productos",
      categoriasPath: "/api/categorias",
      usuariosPath: "/api/usuarios",
      uploadsPath: "/api/uploads",
    };

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection(); //desde config.js en database
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    //Lectura y parse del body
    this.app.use(express.json());

    //Directorio público, sale al abrir  la app
    this.app.use(express.static("public"));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.authPath, require("../routes/auth"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.categoriasPath, require("../routes/categorias"));
    this.app.use(this.paths.productosPath, require("../routes/productos"));
    this.app.use(this.paths.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.paths.uploadsPath, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Corriendo en el puerto http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
