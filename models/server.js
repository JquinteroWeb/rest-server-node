const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
const fileUpload = require('express-fileupload');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.paths = {
            auth: '/api/auth',
            category: '/api/categories',
            user: '/api/users',
            product: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads',
        }


        //Connect to the database
        this.connectarDB();
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

    }
    async connectarDB() {
        await dbConnection();
    }

    middlewares() {
        //Cors
        this.app.use(cors());
        //Lectura y parseo
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
        //Manejar carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }

    routes() {
        //Routes
        this.app.use(this.paths.user, require('../routes/users'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.category, require('../routes/categories'));
        this.app.use(this.paths.product, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen(port) {
        this.app.listen(this.port, () => {
            console.log(`Server running in http://localhost:${process.env.PORT}`);
        });
    }


}

module.exports = Server;