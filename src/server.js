const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

require('dotenv').config()

const routes = require('./routes')
const Mongo = require('./conecction')

const server = express();

Mongo.connect()


server.use(cors()); 
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(routes);



server.listen(3000); // vai rodar no localhost:3000 