const mongoose = require('mongoose')
const router = require("express").Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());

var mongodb = {
    connect: function(){
        
        mongoose.connect('mongodb+srv://'+process.env.USUARIO+':'+process.env.SENHA+'@cluster0-fcvhz.mongodb.net/'+process.env.NOMEBANCO+'?retryWrites=true&w=majority', { //Coloca a string de conexão do seu cluster MongoDB
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
    }
}
module.exports = mongodb