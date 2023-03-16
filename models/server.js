const express = require('express');
const cors = require('cors');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 4000;

        //Middlewares
        this.middlewares();

        //Routes
        this.usersPath = '/api/users'
        this.routes();

    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Read and parse body
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/users.routes'))
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server runnig on port', this.port);
        })
    }
}

module.exports = Server;
