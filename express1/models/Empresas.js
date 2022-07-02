
const mongoose = require('mongoose')

const empresaSchema = mongoose.Schema({
    name: {
        type: String,
        required:false
    },
    history:{
        type: Array,
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

module.exports = mongoose.model("empresa", empresaSchema)
