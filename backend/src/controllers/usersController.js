const usarioModel = require("../models/userModel");

exports.register = async (req, res) => {
    try {
        const { nombre, apellido, email, password, rol } = req.body;
        const user = new usarioModel({ nombre, apellido, email, password, rol });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};
