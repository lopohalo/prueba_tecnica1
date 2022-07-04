
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
    documento: {
        type: String,
        required: false
    },
    tareas: {
        type: Array,
        required: false
    },
    fec_cre: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("contacto", contactoSchema)
