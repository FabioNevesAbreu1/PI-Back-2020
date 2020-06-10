const { Schema, model } = require('mongoose')

const DevSchema = new Schema({ // tabela de produtos
    User: {
        type: Schema.Types.ObjectId, ref: "Users",
        required: true,
    },
    Institution: {
        type: Schema.Types.ObjectId, ref: "institutions",
        required: true,
    },
    DataDonation: {
        type: String,
        required: true,
    },
    DateDonation: { 
        type: String,  // formato DD/MM/YYYY
        required: true,
    }
});

module.exports = model('Interest', DevSchema)