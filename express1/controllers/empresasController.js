const Empresas = require('../models/Empresas')

exports.crearEmpresa = async (req, res) => {
    
    try {
        let empresa
        empresa = new Empresas(req.body)
        await empresa.save()
        return  res.status(200).send(empresa)
        
    } catch (error) {
        console.log(error)
        return  res.status(500).send("Hay un problema")
    }
}
exports.obtenerEmpresas = async(req, res) => {
    try {
        let contactos = await Empresas.find();
        res.json(contactos)
    } catch (error) {
        console.log(error)
        return  res.status(500).send("Hay un problema")
    }
}
exports.actualizarEmpresa = async (req, res) => {
    try {
        const { history } = req.body
        const existeUsuario = await Empresas.findById(req.params.id)
        if (!existeUsuario) {
            res.status(404).json({ mensaje: "No existe la información solicitada" })
        }

        existeUsuario.history = history


        let procesoUpdate = await Empresas.findOneAndUpdate({_id: req.params.id }, existeUsuario, { new: true })
        res.json(procesoUpdate)

    } catch (error) {
        console.log(error)
        res.status(500).send("Hay un problema")
    }
}
exports.obtenerEmpresa = async (req, res) => {
    try {
        const {name} = req.body
        console.log(name)
        let empresa = await Empresas.findOne({name})
        if (!empresa) {
            res.status(404).json({ mensaje: "No existe la información solicitada" })
        }
        res.json(empresa)
    } catch (error) {
        console.log(error)
        res.status(500).send("Hay un problema")
    }
}
