
const mongoose = require('mongoose')

const contactoSchema = mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    empresa:{
        type: String,
        required: false
    },
    nit:{
        type: String,
        required: false
    },
    dirección:{
        type: String,
        required: false
    },
    telefono:{
        type: String,
        required: false
    },
    

    fec_cre: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("contacto", contactoSchema)
