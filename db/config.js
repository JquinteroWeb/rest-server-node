const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('*****CONEXION WITH MONGODB SUCCESS ******');       


    } catch (error) {
        console.log(error);
        throw new Error("***CONEXION WITH MONGODB FAILED ****");
    }
}

module.exports = {
    dbConnection
}
