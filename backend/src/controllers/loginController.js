const usuariosModel = require("../models/userModel");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usuariosModel.findOne({ email, password });

        if (user) {
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};