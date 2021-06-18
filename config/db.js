const mongoose = require('mongoose')

require('dotenv').config({path: 'variable.env'})

const conectarDb = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('database conectada');
    } catch (error) {
        console.log(error);
        process.exit(1) //detiene la app
    }
}

module.exports = conectarDb