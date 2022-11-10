const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config')
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usersRoutePath = '/api/users';
        this.authRoutePath  = '/api/auth';
        
        //Connect to the database
        this.connectarDB();
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();

    }
    async connectarDB(){
        await dbConnection();
    }

    middlewares() {
        //Cors
        this.app.use(cors());
        //Lectura y parseo
        this.app.use(express.json());       
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersRoutePath, require('../routes/user'));
        this.app.use(this.authRoutePath, require('../routes/auth'));
    }

    listen(port) {
        this.app.listen(this.port, () => {
            console.log(`Server running in http://localhost:${process.env.PORT}`);
        });
    }


}

module.exports = Server;