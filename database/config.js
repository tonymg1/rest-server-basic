const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Connected to database')
    } catch (error) {
        console.log(error)
        throw new Error('Error starting database');
    }
}

module.exports = {
    dbConnection
}