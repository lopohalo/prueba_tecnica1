const Contacto = require('../models/Contacto')

exports.crearContacto = async (req, res) => {
    const { email } = req.body
    const existeUsuario = await Contacto.findOne({ email })
    if (existeUsuario) {
        return res.status(404).json({ mensaje: "Usuario ya registrado" })
    }
    try {
        let contacto
        contacto = new Contacto(req.body)
        await contacto.save()
        return  res.status(200).send(contacto)
        
    } catch (error) {
        console.log(error)
        return  res.status(500).send("Hay un problema")
    }
}
exports.obtenerContactos = async(req, res) => {
    try {
        let contactos = await Contacto.find();
        res.json(contactos)
    } catch (error) {
        console.log(error)
        return  res.status(500).send("Hay un problema")
    }
}

exports.obtenerContacto = async (req, res) => {
    try {
        let contacto = await Contacto.findById(req.params.id)
        if (!contacto) {
            res.status(404).json({ mensaje: "No existe la información solicitada" })
        }
        res.json(contacto)
    } catch (error) {
        console.log(error)
        res.status(500).send("Hay un problema")
    }
}
// exports.actualizarContacto = async (req, res) => {
//     try {
//         const { email } = req.body

//         const existeUsuario = await Contacto.findOne({ email })
//         if (!existeUsuario) {
//             res.status(404).json({ mensaje: "No existe la información solicitada" })
//         }



//         let procesoUpdate = await Contacto.findOneAndUpdate({ email }, existeUsuario, { new: true })
//         res.json(procesoUpdate)

//     } catch (error) {
//         console.log(error)
//         res.status(500).send("Hay un problema")
//     }
// }
exports.borrarContacto = async (req, res) => {
    try {
        let contacto = await Contacto.findById(req.params.id)
        if (!contacto) {
            res.status(404).json({ mensaje: "No existe la información solicitada" })
        }

        await Contacto.findByIdAndRemove({ _id: req.params.id })
        res.status(200).json({ mensaje: "Dato eliminado satisfactoriamente" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Hay un problema")
    }
}
exports.autenticar = async (req, res) => {
    
    try {
        const { email,password } = req.body
    const existeUsuario = await Contacto.findOne({ email })
    if (!existeUsuario) {
        return res.status(404).json({ mensaje: "Usuario no registrado" })
    } 
    const password1 = await existeUsuario.password
    if(password1 == password){
        res.json(existeUsuario)
    }else{
        return res.status(500).json({ mensaje: "Usuario o contraseña no coincide" })
    }
    } catch (error) {
        console.log(error)
        res.status(500).send("Hay un problema")
    }
}
