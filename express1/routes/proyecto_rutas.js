const express = require('express')
const router = express.Router();
const contactoController = require('../controllers/contactoController')
const empresaController = require('../controllers/empresasController')
router.post('/crear-empresa', empresaController.crearEmpresa)
router.get('/obtener-empresas/', empresaController.obtenerEmpresas)
router.get('/obtener-empresa', empresaController.obtenerEmpresa)
router.put('/actualizar-empresa', empresaController.actualizarEmpresa)

router.post('/', contactoController.crearContacto)
router.post('/login', contactoController.autenticar)
router.get('/obtener-contacto/:id', contactoController.obtenerContacto)
router.get('/obtener-contactos/', contactoController.obtenerContactos)
router.put('/actualizar-contacto/id', contactoController.actualizarContacto)
router.delete('/borrar-contacto/:id', contactoController.borrarContacto)

module.exports = router
