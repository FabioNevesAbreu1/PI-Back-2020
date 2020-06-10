const { Schema, model } = require('mongoose')

const DevSchema = new Schema({ // tabela de produtos
    Name: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    CPF: {
        type: Number,
        required: true,
    },
    Street: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Neighborhood: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Complements: {
        type: String,
        required: true,
    }
});

module.exports = model("Users", DevSchema);