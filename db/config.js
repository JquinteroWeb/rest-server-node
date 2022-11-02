const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('conectado a mongodb');       


    } catch (error) {
        console.log(error);
        throw new Error("Error de conexión");
    }
}

module.exports = {
    dbConnection
}
