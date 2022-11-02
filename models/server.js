const express = require('express');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usersRoutePath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

    }

    middlewares() {
        //Cors
        this.app.use(cors());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersRoutePath, require('../routes/user'));

    }

    listen(port) {
        this.app.listen(this.port, () => {
            console.log(`Server running in http://localhost:${process.env.PORT}`);
        });
    }


}

module.exports = Server;