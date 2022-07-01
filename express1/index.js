const express = require('express');
const conectarBaseDeDatos = require('./config/db')
const cors = require('cors');
const aplicacion = express();  
conectarBaseDeDatos()
aplicacion.use(cors());
aplicacion.use(express.json());

aplicacion.use('/api', require('./routes/proyecto_rutas'))

aplicacion.listen(4000,()=>{
    console.log("el servidor se ejecuta en el puerto 4000")
})
